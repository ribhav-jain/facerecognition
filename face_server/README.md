# Face Recognition Server

## Installation

From source:

```bash
git clone https://github.com/ribhav-jain/facerecognition.git
cd face_server
make install
```

From pypi:

```bash
pip install face_server
```

## Executing

Just run:

```bash
$ face_server
```

or

```bash
$ python -m face_server
```

To see the help message and usage instructions.

## First run

```bash
face_server create-db
face_server populate-db  # Optional
face_server run
```
