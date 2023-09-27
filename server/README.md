## virtual env setup

### Install virtual env

```
pip3 install virtualenv
```

### Create virtaul environment

```
python3 -m venv hack2k23
```

a new folder called hack2k23 has been created. hack2k23 is the name of our virtual environment, but it can be named anything you want.

### Activate virtual env

to activate virtual env

```
source hack2k23/bin/activate
```

### install requirements

```
pip install -r requirements.txt
```

### deactivate env

```
deactivate
```

## Server setup

### run server

```
uvicorn main:app --reload
```

### see api docs

```
http://127.0.0.1:8000/docs
```
