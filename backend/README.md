# Backend Setup

1. Setup virtual enviroment

```
pip install virtualenv
virtualenv venv
```

**WINDOWS:**

```
venv/Scripts/activate
```

**LINUX:**

```
source venv/bin/activate
```

**_NOTE:_** Do it only if you are not using pycharm

**_PyCharm:_**

Open just backend folder and it will do job for you. If you have any issues go to this webiste:

[Jetbrains-Setup-Venv](https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html)

2. Install all requirements

```
pip install -r requirements.txt
```

3. Run

If you are using PyCharm just add fastapi configuration to run it. If you have any issues got to this website:

[JetBrains-Setup-FastApi](https://www.jetbrains.com/help/pycharm/fastapi-project.html)

Run by command line:
```
uvicorn main:app --host 0.0.0.0 --port 8080
```

**_NOTE:_** You can change ip address and port number