import json
from flask import Flask, request, jsonify
from uagents import Model
from flask_cors import CORS # CROSS-ORIGIN-RESOURCE-SHARING
from uagents.query import query

class TestRequest(Model):
    message: str
    
deep_agent = "agent1q0vxh8ulmldgsa6d2ymh3ww83el2vejjhzzjcyeduc4j56kewhg56ve7s7f"

app = Flask(__name__)
CORS(app)

async def agent_query(req):
    # print("helo from agent_query")
    response = await query(destination=deep_agent, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data["text"]

@app.route("/deep", methods=["GET"])
def read_root():
    return "Hello from the DeepFake Controller"

@app.route("/deep", methods=["POST"])
async def make_agent_call():
    try:
        req_data = request.json
        addrs = req_data.get('addrs')
        # print(addrs)
        req = TestRequest(message=addrs)
        # print(req)
        result = await agent_query(req)
        # print(result)
        return jsonify({"accuracy": result})
    except Exception as e:
        return jsonify({"message": f"unsuccessful agent call - error: {str(e)}"}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=8012)