from fastapi import FastAPI, HTTPException

from data_loader import get_subtitle

app = FastAPI()


@app.get("/")
async def root():
    return {"hello": "world"}


@app.get("/resposne/{video_id}")
async def get_response(video_id):
    try:
        subs = get_subtitle(video_id)
        return {"subs": subs}
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
