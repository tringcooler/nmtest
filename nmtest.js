
var m_canvas = (function() {
    
	function m_canvas(width, height) {
        var canvas = $('<canvas>');
        //canvas.width(size[0]);
        //canvas.height(size[1]);
        //issue for canvas resize
        canvas.attr('width', width);
        canvas.attr('height', height);
        this.elem = canvas;
        this.cvs = canvas.get(0)
        this.sync_meta();
	}
    
    m_canvas.prototype.sync_meta = function() {
        this.ctx = this.cvs.getContext('2d');
        this.width = this.cvs.width;
        this.height = this.cvs.height;
    };
    
	m_canvas.prototype.draw = function(mmv) {
        idata = this.ctx.createImageData(this.width, this.height);
        var ilen = idata.width * idata.height * 4;
        var unnm = a => (a + 1) / 2 * 255;
        for(var i = 0; i < ilen; i += 4) {
            if(mmv.length == 3) {
                idata.data[i + 0] = unnm(mmv[0][i/4]);
                idata.data[i + 1] = unnm(mmv[1][i/4]);
                idata.data[i + 2] = unnm(mmv[2][i/4]);
            } else {
                idata.data[i + 0] = unnm(mmv[i/4]);
                idata.data[i + 1] = unnm(mmv[i/4]);
                idata.data[i + 2] = unnm(mmv[i/4]);
            }
            idata.data[i + 3] = 255;
        }
        this.ctx.putImageData(idata, 0, 0);
    };
    
    return m_canvas;
    
})();

var m_matrix = (function() {
    
	function m_matrix(srcm) {
        this.srcm = srcm;
	}
    
    m_matrix.prototype.e_op = function(op, a, b) {
        if( !(a instanceof Array) && !(b instanceof Array) ) {
            if(op.length > 1) {
                if(b === null) {
                    return eval(op + '(' + a + ')');
                } else {
                    return eval(op + '(' + a + ',' + b + ')');
                }
            } else {
                return eval(a + op + b);
            }
        } else if(!(a instanceof Array)) {
            a = Array(b.length).fill(a);
        } else if(!(b instanceof Array)) {
            b = Array(a.length).fill(b);
        }
        var r = [];
        var num = Math.min(a.length, b.length);
        for(var i = 0; i < num; i++){
            r.push(this.e_op(op, a[i], b[i]));
        }
        return r;
    };
    
	m_matrix.prototype.bright = function() {
        return this.e_op('Math.sqrt',
            this.e_op('+',
            this.e_op('+',
                this.e_op('Math.pow', this.srcm[0], 2),
                this.e_op('Math.pow', this.srcm[1], 2)),
                this.e_op('Math.pow', this.srcm[2], 2)),
            null);
    };
    
    return m_matrix;
    
})();

var nm_sphere = function(rad, size, cent = null) {
    if(cent == null) {
        cent = size.map(a=>Math.floor(a/2));
    }
    var calc_v = function(x, y, r) {
        var d2 = x * x + y * y;
        var r2 = r * r;
        var v;
        if(d2 > r2) {
            v = [0, 0, rad];
        } else {
            v = [x, y, Math.sqrt(r2 - d2)];
        }
        return v.map(a=>a/r);
    }
    var r = [[], [], []];
    for(var x = 0; x < size[0]; x ++) {
        for(var y = 0; y < size[1]; y ++) {
            var d = calc_v(x - cent[0], y - cent[1], rad);
            [0,1,2].map(i=>r[i].push(d[i]));
        }
    }
    return r;
}
