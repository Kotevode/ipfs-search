const expectThrow = async (promise, message = null) => {
      try {
        await promise();
      } catch (error) {
        if (message) {
          assert.equal(error.message, message);
        }
        return;
      }
      assert.fail('Expected throw not received');
    };

export default expectThrow
