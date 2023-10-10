import os
from fastapi import FastAPI, HTTPException

from data_loader import get_subtitle

app = FastAPI()

GPT_INDEX_FOLDER = "data/gpt_index"


@app.get("/")
async def root():
    return {"hello": "world"}


@app.get("/resposne/{video_id}")
async def get_response(video_id):
    try:
        subs = get_subtitle(video_id)
        f = open(f"{GPT_INDEX_FOLDER}/{video_id}.json", mode="w", encoding="utf8")
        f.write(subs)
        f.close()
        return {"subs": subs}
    except Exception as error:
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
