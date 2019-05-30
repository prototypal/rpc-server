import { Router, Controller, jsonApiType, jsonRpcMethod, jsonApiOperation } from "../../src";

@jsonApiType("channel")
class JsonApiChannelController extends Controller {
  @jsonApiOperation("installApp")
  async create(op: any) {
    return `JSONAPI: I've created a channel called ${op.data.attributes.name}`;
  }

  async get(op: any) {
    return `JSONAPI: I've found a channel by its ID ${op.ref.id}`;
  }
}

class JsonRpcChannelController extends Controller {
  @jsonRpcMethod("chan_installApp")
  async create({ name }: { name: string }) {
    return `JSONRPC: I've created a channel called ${name}`;
  }
}

@jsonApiType("channel2")
class MixedFormatChannelController extends Controller {
  @jsonRpcMethod("chan2_installApp")
  @jsonApiOperation("installApp")
  async create(data: any) {
    if (data.op) {
      return this.jsonApiCreate(data);
    }

    return this.jsonRpcCreate(data);
  }

  private async jsonApiCreate(op: any) {
    return `MixedFormat/JSONAPI: I've created a channel called ${op.data.attributes.name}`;
  }

  private async jsonRpcCreate({ name }: { name: string }) {
    return `MixedFormat/JSONRPC: I've created a channel called ${name}`;
  }
}

const router = new Router({
  controllers: [JsonApiChannelController, JsonRpcChannelController, MixedFormatChannelController]
});

router.dispatch({ jsonrpc: "2.0", id: 1, method: "chan_installApp", params: { name: "Joey" } }).then(console.log);
router
  .dispatch({
    op: "installApp",
    ref: {
      type: "channel"
    },
    data: {
      attributes: {
        name: "Joey"
      }
    }
  })
  .then(console.log);

router
  .dispatch({
    op: "get",
    ref: {
      type: "channel",
      id: "123"
    }
  })
  .then(console.log);

router.dispatch({ jsonrpc: "2.0", id: 1, method: "chan2_installApp", params: { name: "Foo" } }).then(console.log);
router
  .dispatch({
    op: "installApp",
    ref: {
      type: "channel2"
    },
    data: {
      attributes: {
        name: "Foo"
      }
    }
  })
  .then(console.log);
