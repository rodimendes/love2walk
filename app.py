# TODO: Send to github
# TODO: Armazenar os dados recolhidos em JSON

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
        

@app.route('/sendData', methods=['POST'])
def receive_data():
    data = request.form
    issue = data['issue']
    gravity = data['gravity']
    try:
        quick_intervention = data['quick-intervention']
    except KeyError:
        quick_intervention = False
    else:
        quick_intervention = True
    print(f'Received data: {issue}, {gravity} and {quick_intervention}')
    return render_template("/success.html")
    

@app.route('/sendLocation', methods=['POST'])
def receive_location():
    data_location = request.get_json()
    latitude = data_location.get('latitude')
    longitude = data_location.get('longitude')
    print(f'Received location data: {latitude}, {longitude}.')
    return render_template("/success.html")



if __name__ == "__main__":
    app.run(debug=True)