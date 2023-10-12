import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from llama_index.data_structs.node_v2 import Node
from llama_index import GPTTreeIndex

from dotenv import load_dotenv

load_dotenv()

from data_loader import get_subtitle
from data_loader import write_subs_to_json
from data_loader import create_time_chunks

GPT_INDEX_FOLDER = "data/gpt_index"
SUBS_FOLDER = "data/subs"

time_chunk_size_mins = 5


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

system_prompt = """You are an agent that is trained to take information from the context and answer questions within that context by accepting a loosely related query. You are free to use an analogy of the question if the information is not verbatim in the context.

If the context of the question is even loosely related to the content then provide a reasonably good answer.

If the question is too outside the context of the video just respond back with 'PromptError'. Do not overuse 'PromptError'. Use sparingly.

Give the above conditions, answer the below user query.

"""


@app.get("/")
async def root():
    return {"hello": "world"}


@app.get("/getAns/{video_id}")
async def get_response(video_id: str, question: str):
    try:
        subs = get_subtitle(video_id)
        f = open(f"{GPT_INDEX_FOLDER}/{video_id}.json", mode="w", encoding="utf8")
        f.write(subs)
        f.close()
        write_subs_to_json(subs, SUBS_FOLDER, video_id)
        create_time_chunks("data/subs", "data/timechunks", time_chunk_size_mins)
        data = json.load(open(file=f"data/timechunks/{video_id}.json", mode="r"))
        # keys, text = list(zip(*data.items()))
        # yaha se kuch samajh nahin aaya
        nodes = [Node(text=text, doc_id=keys) for keys, text in data.items()]
        index = GPTTreeIndex(nodes=nodes)
        # save it
        index.save_to_disk(f"data/gpt_index/{video_id}.json")

        response = index.query(f"{system_prompt}\n{question}")

        print(f"response: {response}")
        source = " ".join(
            [node_with_score.node.doc_id for node_with_score in response.source_nodes]
        )
        print(f"sources: {source}")

        # return {
        #     "response": question,
        #     "start_time": 0,
        #     "end_time": 200,
        # }

        return {"response": str(response), "sources": source}
    except Exception as error:
        print(error)
        raise HTTPException(status_code=400, detail=str(error)) from error


@app.get("/list")
async def get_list_of_processed_videos():
    try:
        video_ids = []
        filenames = os.listdir("data/gpt_index")
        for file in filenames:
            print(file)
            video_ids.append(file.split(".")[0])
        return {"video_ids": video_ids}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error
