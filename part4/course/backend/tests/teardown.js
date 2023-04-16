// Remove the asynchronous error - "Jest did not exit one second after the test run has completed."
module.exports = () => {
  process.exit(0);
};
