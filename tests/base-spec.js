
  var base = require('../src/base');
  var expect = require('expect.js');//断言

  describe('base', function() {
    it('base is existed', function() {
        expect(base).to.be.ok();
        expect(base.baseUrl).to.be.ok();
        expect(base.isNull).to.be.ok();
        expect(base.formatParams).to.be.ok();
        expect(base.main).to.not.be.ok();
    });

 	it('should return not empty string', function() {
    	//断言值是否为 真
        expect(base.baseUrl()!=null && base.baseUrl()!='' || ).to.be.ok();
    });

    it('should return true when the value is null or "" ', function() {
    	//断言值是否为 真
        expect(base.isNull(null)).to.be.ok();
        expect(base.isNull("")).to.be.ok();
    });

    it('should return false when the value not is null or "" ', function() {
        //断言值是否为 假
        expect(base.isNull("test")).to.not.be.ok();
        expect(base.isNull(1)).to.not.be.ok();
        expect(base.isNull(0)).to.not.be.ok();
    });
  });

