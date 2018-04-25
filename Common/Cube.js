const DefaultNumSides = 8;

function cube( gl, numSides, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "cube-vertex-shader";
    var fragShdr = fragmentShaderId || "cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

	// center at [0,0,0]
	// side length = 1
	this.positions.values = [
		0, 0, 0, //1
		1, 0, 0, //2
		0, 1, 0, //3
		1, 1, 0, //4
		0, 0, 1, //5
		1, 0, 1, //6
		0, 1, 1, //7
		1, 1, 1]; //8
	
	this.numComp = 3;
	
	this.indices.values = [
		1, 2, 3
		2, 3, 4
		
		];
	
    indices.push(n);

    // Record the number of indices in one of our two disks that we're using to make the
    //   cube.  At this point, the indices array contains the correct number of indices for a
    //   single disk, and as we render the cube as two disks of the same size, this value is
    //   precisely what we need.
    //
    this.indices = { count : indices.length };

    // Now build up the list for the cube.  First, add the apex vertex onto the index list
    //
    indices.push(n + 1);

    // Next, we need to append the rest of the vertices for the permieter of the disk.
    // However, the cube's perimeter vertices need to be reversed since it's effectively a
    // reflection of the bottom disk.
    //
    indices = indices.concat( indices.slice(1,n+2).reverse() );

    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        // Draw the cube's base
        //
        gl.drawElements( gl.POINTS, this.indices.count, gl.UNSIGNED_SHORT, 0 );

        // Draw the cube's top
        //
        var offset = this.indices.count * 2 /* sizeof(UNSIGNED_INT) */;
        gl.drawElements( gl.POINTS, this.indices.count, gl.UNSIGNED_SHORT, offset );
    }
};
