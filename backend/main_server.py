import json
from flask import Flask, request, jsonify
from uagents import Model
from flask_cors import CORS # CROSS-ORIGIN-RESOURCE-SHARING
from uagents.query import query

class TestRequest(Model):
    message: str
    
gemini_agent = "agent1qt6ehs6kqdgtrsduuzslqnrzwkrcn3z0cfvwsdj22s27kvatrxu8sy3vag0"

async def agent_query(req):
    print("hello from agent_query")
    response = await query(destination=gemini_agent, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data["text"]

app = Flask(__name__)
CORS(app)

@app.route("/home", methods=["GET"])
def read_root():
    return "Hello from the Agent controller"

@app.route("/home", methods=["POST"])
async def make_agent_call():
    try:
        req_data = request.json
        sentence = req_data.get('sentence')
        print (sentence)
        req = TestRequest(message=sentence)
        print(req)
        res = await agent_query(req)
        print(res)
        return jsonify({"new_sentence": res})
    except Exception as e:
        return jsonify({"message": f"unsuccessful agent call - error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=7000)
