import click
from flask.cli import FlaskGroup

from . import create_app_wsgi


@click.group(cls=FlaskGroup, create_app=create_app_wsgi)
def main():
    """Management script for the face_server."""


if __name__ == "__main__":
    main()
