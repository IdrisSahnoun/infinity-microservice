# init_members.py
from app import app
from models import db, Member

with app.app_context():
    # Supprimer les données existantes (optionnel)
    db.session.query(Member).delete()

    # Ajouter des membres statiques
    members = [
        Member(member_id=1, name="John Doe", email="john.doe@example.com"),
        Member(member_id=2, name="Jane Smith", email="jane.smith@example.com"),
        Member(member_id=3, name="Alice Johnson", email="alice.johnson@example.com", role="admin")
    ]
    db.session.add_all(members)
    db.session.commit()

print("Données statiques insérées dans la table 'members' avec succès !")