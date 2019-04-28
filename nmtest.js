
var m_canvas = (function() {
    
	function m_canvas(parent, size = [300, 300]) {
        var canvas = $('<canvas>');
        canvas.width(size[0]);
        canvas.height(size[1]);
        parent.append(canvas);
        this.elem = canvas;
        this.size = size;
	}
    
	m_canvas.prototype.draw = function(mmv) {
        
    }
    
    return m_canvas;
    
})();

var m_matrix = (function() {
    
	function m_matrix(...srcm) {
        this.srcm = srcm;
	}
    
    m_matrix.prototype.e_op = function(op, a, b) {
        if( !(a instanceof Array) && !(b instanceof Array) ) {
            return eval(a + op + b);
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
    }
    
	m_matrix.prototype.bright = function() {
        
    }
    
    return m_matrix;
    
})();
