import click
from src.database import db


def create_db():
    db.create_all()


def drop_db():
    db.drop_all()


def populate_db():
    pass


def init_app(app):
    # add multiple commands in a bulk
    for command in [create_db, drop_db, populate_db]:
        app.cli.add_command(app.cli.command()(command))

    @app.cli.command()
    @click.option("--username", "-u")
    @click.option("--password", "-p")
    def add_user(username, password):
        pass
