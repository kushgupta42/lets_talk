import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data_loader import get_subtitle
from data_loader import write_subs_to_json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GPT_INDEX_FOLDER = "data/gpt_index"
SUBS_FOLDER = "data/subs"


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

        return {
            "response": question,
            "start_time": 0,
            "end_time": 200,
        }
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
