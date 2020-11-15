process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);
process.on('SIGHUP', stopHandler);

function stopHandler() {
  console.log('Stopping...');
  process.exit(0);
}
