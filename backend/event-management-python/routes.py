# routes.py
from flask import Flask, jsonify, request, abort
from models import db, Event, Participant

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Initialisation de la base de données
    db.init_app(app)

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
            date=data['date'],  # Format ISO (ex. "2023-11-15T18:00:00")
            location=data['location'],
            max_participants=data['max_participants']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event created successfully', 'event_id': new_event.event_id}), 201

    @app.route('/api/events/<int:event_id>/register', methods=['POST'])
    def register_participant(event_id):
        event = Event.query.get_or_404(event_id)
        if len(event.participants) >= event.max_participants:
            abort(400, description="Event is full. Cannot register more participants.")

        data = request.json
        member_id = data['member_id']

        # Appel au microservice Membre pour valider le membre
        try:
            member_details = request.get(f"http://localhost:8080/api/members/{member_id}").json()
            member_name = member_details['name']  # Récupérer le nom du membre
        except Exception as e:
            abort(400, description=f"Invalid member ID: {e}")

        # Créer l'inscription
        new_participant = Participant(
            member_id=member_id,
            member_name=member_name,
            event_id=event_id
        )
        db.session.add(new_participant)
        db.session.commit()
        return jsonify({'message': f'Successfully registered for event ID {event_id}'})

    return app