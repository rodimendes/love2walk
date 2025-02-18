import json
from flask import Flask, render_template, request, jsonify
import datetime
import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/Users/rodimendes/Documents/my_projects/love2walk_python/images'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

JSON_FILE_PATH = 'data.json'
current_entry = {}  # Armazena temporariamente os dados antes de salvar

def load_data():
    """Carrega os dados do arquivo JSON e retorna uma lista."""
    try:
        with open(JSON_FILE_PATH, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_data():
    """Salva o registro completo no arquivo JSON e reseta `current_entry`."""
    global current_entry
    data = load_data()  # Carrega os dados existentes
    data.append(current_entry)  # Adiciona a nova entrada
    with open(JSON_FILE_PATH, 'w') as file:
        json.dump(data, file, indent=4)  # Salva corretamente no formato JSON
    current_entry = {}  # Limpa os dados temporários para a próxima entrada

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/sendData', methods=['POST'])
def receive_data():
    """Recebe os dados do formulário e armazena no dicionário temporário."""
    global current_entry
    data = request.form
    image = request.files['user-file']
    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    current_entry['issue'] = data['issue']
    current_entry['gravity'] = data['gravity']
    current_entry['quick_intervention'] = data.get('quick-intervention', False)
    current_entry['date_time'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    current_entry['filepath'] = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Se já temos latitude e longitude, salvamos os dados no JSON
    if 'latitude' in current_entry and 'longitude' in current_entry:
        save_data()
    
    print(f"Received data: {current_entry}")
    return render_template("/success.html", name=image.filename)

@app.route('/sendLocation', methods=['POST'])
def receive_location():
    """Recebe a localização e armazena no dicionário temporário."""
    global current_entry
    data_location = request.get_json()
    current_entry['latitude'] = data_location.get('latitude')
    current_entry['longitude'] = data_location.get('longitude')

    # Se já temos issue, gravity e quick_intervention, salvamos os dados no JSON
    if 'issue' in current_entry and 'gravity' in current_entry:
        save_data()
    
    print(f"Received location data: {current_entry}")
    return render_template("/success.html")

@app.route('/getStoredData', methods=['GET'])
def get_stored_data():
    """Rota para visualizar os dados armazenados."""
    stored_data = load_data()
    return jsonify(stored_data)

if __name__ == "__main__":
    app.run(debug=True)
