from flask import Flask
from config import Config
from models import db  # Importer l'instance créée dans models.py

app = Flask(__name__)
app.config.from_object(Config)

# Initialiser l'instance SQLAlchemy avec l'app
db.init_app(app)

# Si tu as d'autres configurations ou routes à enregistrer
@app.route('/')
def home():
    return "Connexion à la base de données réussie !"

# Importer et enregistrer les routes depuis routes.py
from routes import register_routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
