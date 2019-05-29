import { Router, Controller, RpcMethod } from "../../src";

class ChannelController extends Controller {
  @RpcMethod("chan_installApp")
  async create(name: string) {
    return `I've created a channel called ${name}`;
  }
}

const router = new Router({
  controllers: [ChannelController]
});

router.dispatch("chan_installApp", ["Joey"]).then(response => {
  console.log(response);
});
