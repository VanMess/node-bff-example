/**
 * Let the user know nothing was found here.
 */
export default async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`;
  ctx.notFound({
    status: 404,
    message: `No endpoint matched your request: ${msg}`
  });
}
