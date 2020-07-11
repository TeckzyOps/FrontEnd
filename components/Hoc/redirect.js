import Router from "next/router";

export default (target, ctx = { res: undefined, req: undefined }) => {
	// server Side Checking
	if (ctx.res) {
		ctx.res.writeHead(303, { Location: target });
		ctx.res.end();
	} else {
		// In the browser, we just pretend like this never even happened ;)
		Router.push(target);
	}
};
