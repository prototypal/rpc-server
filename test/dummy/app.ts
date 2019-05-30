import { Router, Controller, RpcMethod, Rpc } from "../../src";

class ChannelController extends Controller {
  @RpcMethod("chan_installApp")
  async create({ name }: { name: string }) {
    return `I've created a channel called ${name}`;
  }
}

const router = new Router({
  controllers: [ChannelController]
});

router
  .dispatch(Rpc.fromJsonRpc({ jsonrpc: "2.0", id: 1, method: "chan_installApp", params: { name: "Joey" } }))
  .then(response => {
    console.log("JSONRPC: ", response);
  });

router
  .dispatch(
    Rpc.fromJsonApiOperation({
      op: "installApp",
      ref: {
        type: "chan"
      },
      data: {
        attributes: {
          name: "Joey"
        }
      }
    })
  )
  .then(response => {
    console.log("JSONAPI: ", response);
  });
