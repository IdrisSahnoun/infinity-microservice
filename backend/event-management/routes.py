from flask import jsonify, request, abort
from models import db, Event, Participant, Member  # Importer "Member"
import requests

def register_routes(app):

    @app.route('/api/events', methods=['GET'])
    def get_all_events():
        events = Event.query.all()
        return jsonify([{
            'event_id': event.event_id,
            'name': event.name,
            'description': event.description,
            'date': event.date.isoformat(),
            'location': event.location,
            'max_participants': event.max_participants,
            'participants': [{'member_id': p.member_id, 'member_name': p.member_name} for p in event.participants]
        } for event in events])

    @app.route('/api/events/<int:event_id>', methods=['GET'])
    def get_event_by_id(event_id):
        event = Event.query.get_or_404(event_id)
        return jsonify({
            'event_id': event.event_id,
            'name': event.name,
            'description': event.description,
            'date': event.date.isoformat(),
            'location': event.location,
            'max_participants': event.max_participants,
            'participants': [{'member_id': p.member_id, 'member_name': p.member_name} for p in event.participants]
        })

    @app.route('/api/events', methods=['POST'])
    def create_event():
        data = request.json
        new_event = Event(
            name=data['name'],
            description=data.get('description'),
            date=data['date'],
            location=data['location'],
            max_participants=data['max_participants']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event created successfully', 'event_id': new_event.event_id}), 201

    @app.route('/api/events/<int:event_id>/register', methods=['POST'])
    def register_participant(event_id):
        """
        Inscrire un membre à un événement spécifique.
        Les informations du membre sont récupérées directement depuis la base de données.
        """
        # Vérifier si l'événement existe
        event = Event.query.get_or_404(event_id)

        # Vérifier si l'événement est complet
        if len(event.participants) >= event.max_participants:
            abort(400, description="Event is full. Cannot register more participants.")

        # Récupérer les données du corps de la requête
        data = request.json
        member_id = data['member_id']

        # Valider l'ID du membre en interrogeant la base de données
        member = Member.query.get(member_id)
        if not member:
            abort(400, description=f"Invalid member ID: {member_id}")

        # Créer une nouvelle inscription
        new_participant = Participant(
            member_id=member.member_id,
            member_name=member.name,
            event_id=event_id
        )
        db.session.add(new_participant)
        db.session.commit()

        # Retourner un message de succès
        return jsonify({'message': f'Successfully registered for event ID {event_id}'})