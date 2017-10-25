//Encode() and decode() function definition

function base64() {
  this.encode = function (arrayBuffer) {
    return new Buffer (arrayBuffer || '').toString('base64');
  };

  this.decode = function (arrayBase64) {
    return new Buffer(arrayBase64 || '', base64).toString('utf8');
  };
}



module.exports = base64;
