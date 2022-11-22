from flask import Flask
from flask import jsonify

#Guardamos nuestro servidor flask en app 
app = Flask(__name__)

#Le estamos diciendo que esta ruta unicamente funciona por get. 
@app.route('/api/v1/transactions', methods=['GET'])

def get_transactions():
    response = {'name': "compra de empanada"}
    return jsonify(response)

@app.route('/api/v1/transaction', methods=['POST'])

def save_transaction():
    print("ESTOY ENTRANDO, TRANQUILO")
    response = {'status': "la transaccion fue guardada"}
    return jsonify(response)

@app.route('/api/v1/transaction', methods=['DELETE'])

def delete_transaction():
    response = {'status': "la transaccion fue eliminada"}
    return jsonify(response)

#Si nuestro programa es el principal, entonces se ejecuta
if __name__ == '__main__':
    app.run(debug=True) #En caso que hagamos cambios, se actualiza

