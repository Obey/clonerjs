///<reference path="../lib/babylon.d.ts" />
///<reference path="../lib/babylon.marbleProceduralTexture.d.ts" />
var BABYLONX;
(function (BABYLONX) {
    class Demoscene {
        constructor(engine, canvas) {
            Demoscene.objInstances = 0 | (Demoscene.objInstances + 1);
            if (engine == undefined || canvas == undefined) {
                this.init();
            }
            else {
                this._canvas = canvas;
                this._engine = engine;
                this._scene = new BABYLON.Scene(engine);
                this.cameras();
                this.lights();
            }
        }
        init() {
            this.dom();
            this._engine = new BABYLON.Engine(this._canvas, true, { stencil: true });
            this._scene = new BABYLON.Scene(this._engine);
            this.cameras();
            this.lights();
            //this.objects();
            //this._scene.debugLayer.show();
            this._engine.runRenderLoop(this.renderloop.bind(this));
        }
        dom() {
            this._canvas = document.getElementById("renderCanvas");
        }
        cameras() {
            this._camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2 + .2, Math.PI / 2, 10, new BABYLON.Vector3(-2.0, 10.19, 22.73), this._scene);
            this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
            this._camera.attachControl(this._canvas, true);
            this._camera.wheelPrecision = 9;
            this._camera.radius = 25;
            this._camera.alpha = Math.PI / 2;
            this._camera.beta = 1.2;
        }
        lights() {
            var lightpos = new BABYLON.Vector3(0, 10, 0);
            this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 3, -10), this._scene);
            this._light.groundColor = new BABYLON.Color3(.9, .9, .9);
            this._light.intensity = 1.0;
        }
        objects() {
        }
        createCubePlain(size = { w: 1, h: 1, d: 1 }, color = "#FF0000", specular = "#0000FF") {
            var options = { width: size.w, depth: size.d, height: size.h };
            var cube = BABYLON.MeshBuilder.CreateBox("cube" + Demoscene.objInstances, options, this._scene);
            var mat = new BABYLON.StandardMaterial("mcube" + Demoscene.objInstances, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.FromHexString(specular);
            cube.material = mat;
            Demoscene.objInstances++;
            return cube;
        }
        createCube(size = { w: 1, h: 1, d: 1 }, color = "#FF0000") {
            var options = { width: size.w, depth: size.d, height: size.h };
            var cube = BABYLON.MeshBuilder.CreateBox("cube" + Demoscene.objInstances, options, this._scene);
            var mat = new BABYLON.StandardMaterial("mcube" + Demoscene.objInstances, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            //mat.wireframe=true; 
            cube.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble" + Demoscene.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = 5;
            marbleTexture.numberOfTilesWidth = 5;
            marbleTexture.jointColor = new BABYLON.Color3(0, 0, 1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0); 
            marbleTexture.amplitude = 9.0;
            mat.diffuseTexture = marbleTexture;
            //mat.alpha=.3;
            //mat.diffuseTexture.hasAlpha=true;  
            Demoscene.objInstances++;
            return cube;
        }
        createCylinder(height = 1, color = "#00ff00", top = 0.5, bottom = 0.5) {
            var mat = new BABYLON.StandardMaterial("cmat" + Demoscene.objInstances, this._scene);
            var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demoscene.objInstances, { height: height, diameterTop: top, diameterBottom: bottom, tessellation: 32 }, this._scene);
            //var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demoscene.objInstances, { height: height, tessellation: 32 }, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            cone.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble" + Demoscene.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = 1.0;
            marbleTexture.numberOfTilesWidth = .5;
            //marbleTexture.jointColor=new BABYLON.Color3(0,0,1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.2;
            mat.diffuseTexture = marbleTexture;
            Demoscene.objInstances++;
            //cone.rotation.x=Math.PI/4;
            return cone;
        }
        createIcoSphere(radius = 6) {
            var mesh = BABYLON.MeshBuilder.CreateIcoSphere("m", { radius: radius }, this._scene);
            mesh.updateFacetData();
            return mesh;
        }
        createSphere(diameter = 1, color = "#0000ff", segments = 32) {
            var mat = new BABYLON.StandardMaterial("stdmat" + Demoscene.objInstances, this._scene);
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere" + Demoscene.objInstances, { diameter: diameter, segments: segments }, this._scene);
            //mat.diffuseTexture= new BABYLON.Texture("testtexture.png",this.scene);
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble" + Demoscene.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = 1.0;
            marbleTexture.numberOfTilesWidth = .5;
            //marbleTexture.jointColor=new BABYLON.Color3(0,0,1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.2;
            mat.diffuseTexture = marbleTexture;
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            sphere.material = mat;
            Demoscene.objInstances++;
            return sphere;
        }
        assignMaterial(mesh, color) {
            var mat = new BABYLON.StandardMaterial("mcube" + Demoscene.objInstances, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.White();
            mesh.material = mat;
            Demoscene.objInstances++;
        }
        assignMarbleMaterial(mesh, marblecolor, jointclolor = "#0000FF") {
            var mat = new BABYLON.StandardMaterial("mmat" + Demoscene.objInstances, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(marblecolor);
            //mat.specularColor = BABYLON.Color3.FromHexString(jointclolor);
            //mat.wireframe=true; 
            mesh.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble" + Demoscene.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = .5;
            marbleTexture.numberOfTilesWidth = .45;
            marbleTexture.jointColor = BABYLON.Color3.FromHexString(marblecolor);
            new BABYLON.Color3(0, 0, 1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9;
            mat.diffuseTexture = marbleTexture;
            //mat.alpha=.3;
            //mat.diffuseTexture.hasAlpha=true;  
            Demoscene.objInstances++;
        }
        assignMetalMaterial(mesh) {
            var hdrTexture = new BABYLON.HDRCubeTexture("assets/roombwblur.hdr", this._scene, 512);
            var metal = new BABYLON.PBRMaterial("xmetal" + Demoscene.objInstances, this._scene);
            metal.reflectionTexture = hdrTexture;
            metal.microSurface = 1;
            metal.reflectivityColor = new BABYLON.Color3(0.9, 0.9, 0.9);
            metal.albedoColor = new BABYLON.Color3(0.02, 0.02, 0.62);
            metal.environmentIntensity = 0.7;
            metal.cameraExposure = 0.66;
            metal.cameraContrast = 1.66;
            mesh.material = metal;
            Demoscene.objInstances++;
        }
        assignGlassMaterial(mesh) {
            var hdrTexture = new BABYLON.HDRCubeTexture("assets/roombwblur.hdr", this._scene, 512);
            var glass = new BABYLON.PBRMaterial("glass", this._scene);
            glass.reflectionTexture = hdrTexture;
            glass.alpha = 0.935;
            glass.environmentIntensity = 0.657;
            glass.cameraExposure = 10.6;
            glass.cameraContrast = 1; //0.66;
            glass.microSurface = 1;
            glass.reflectivityColor = new BABYLON.Color3(.93, .3, .3); //(0.2, 0.42, 0.42);
            glass.albedoColor = new BABYLON.Color3(0, 0, 0); //new BABYLON.Color3(0.0095, 0.0095, 0.0095);
            mesh.material = glass;
            //mesh.material.diffuseColor = new BABYLON.Color3(.5, .0, .0);
            //mesh.material.specularColor = new BABYLON.Color3(.5, .0, .0);
            //mesh.material.emissiveColor = new BABYLON.Color3(.5, .0, .0);
            /*
                        var loader = new BABYLON.AssetsManager(this._scene);
                        var textureTask = loader.addTextureTask("image task", "assets/roombwblur.hdr");
                        var glass = new BABYLON.PBRMaterial("glass", this._scene);
                       textureTask.onSuccess = function (task) {
                            //var hdrTexture = new BABYLON.HDRCubeTexture("assets/roombwblur.hdr", this._scene, 512);
                            glass.reflectionTexture = task.texture;
                            glass.alpha = 0.35;
                            glass.environmentIntensity = 0.657;
                            glass.cameraExposure = 20.6
                            glass.cameraContrast = 1;//0.66;
                            glass.microSurface = 1;
                            glass.reflectivityColor = new BABYLON.Color3(.3, .3, .3);//(0.2, 0.42, 0.42);
                            glass.albedoColor = new BABYLON.Color3(0, 0, 0);//new BABYLON.Color3(0.0095, 0.0095, 0.0095);
                            mesh.material = glass;
                        }
                        loader.load();
                        */
        }
        renderloop() {
            this._scene.render();
        }
        get scene() {
            return this._scene;
        }
        get engine() {
            return this._engine;
        }
        get camera() {
            return this._camera;
        }
        get light() {
            return this._light;
        }
    }
    BABYLONX.Demoscene = Demoscene;
    class CMesh extends BABYLON.Mesh {
        constructor(name, scene, parent, cloner = null) {
            super(name, scene, parent);
            this._cloner = null;
            this._index = 0;
            this._cloner = cloner;
            //this.parent=parent;
        }
        delete() {
            if (this._cloner != null) {
                this._cloner.delete();
            }
            else {
                this.getChildren()[0].dispose();
            }
            this.parent = null;
            this.dispose();
        }
        createClone(item, useInstances, name) {
            var c;
            if (item instanceof Cloner) {
                c = item.createClone(this);
            }
            else {
                if (useInstances) {
                    c = item.createInstance(name + "_i");
                    c.parent = this;
                }
                else {
                    c = item.clone(name + "_c");
                    c.parent = this;
                }
            }
            return c;
        }
    }
    BABYLONX.CMesh = CMesh;
    class NoiseGen {
        constructor() {
            this._color1 = "#c0dec9";
            this._color2 = "#282226";
            this._octaves = 6;
            this._persistence = .9;
            this._scale = 36.3;
            this._seed = 1;
            this._size = 250;
            this._percentage = .6;
            this._type = 2;
        }
        rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
        }
        hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        setPerlinNoise(ctx, options) {
            //setPerlinNoise(ctx, size, color1, color2, type, octaves, persistence, scale, seed, percentage) {
            this._ctx = ctx;
            var color1 = options.color1 || this._color1;
            var color2 = options.color2 || this._color2;
            var size = options.size || this._size;
            var octaves = options.octaves || this._octaves;
            var persistence = options.persistence || this._persistence;
            var scale = options.scale || this.scale;
            var seed = options.seed || this._seed;
            var percentage = options.percentage || this._percentage;
            var type = options.type || this._type;
            //var type = "PerlinNoise";
            //var c = canvas;
            //var ctx = c.getContext("2d");
            var max_w = size, max_h = size;
            var S = new SimplexNoise(seed);
            var imgData = ctx.getImageData(0, 0, max_w, max_h);
            var d = imgData.data;
            var col1_rgb = this.hexToRgb(color1);
            var col2_rgb = this.hexToRgb(color2);
            var scale_s = scale;
            var before = new Date().getTime();
            var noise_type;
            if (type == 0)
                noise_type = NoiseTypeEnum.PERLINNOISE;
            else if (type == 1)
                noise_type = NoiseTypeEnum.FRACTALNOISE;
            else if (type == 2)
                noise_type = NoiseTypeEnum.TURBULENCE;
            for (var y = 0; y < max_h; y++)
                for (var x = 0; x < max_w; x++) {
                    // octaves, persistence, scale, loBound, hiBound, x, y
                    var v = S.simplexNoise(noise_type, size, octaves, persistence, percentage, scale_s, x, y);
                    //v = v * lo_hi_mul + lo_hi_add; // not sure what this does...
                    //if (type == "PerlinNoise")
                    //v = (v + 1.0) / 2.0; //interval [0,1]. 
                    var i = (x + y * max_w) * 4;
                    d[i] = v * col1_rgb.r + ((1.0 - v) * col2_rgb.r);
                    d[i + 1] = v * col1_rgb.g + ((1.0 - v) * col2_rgb.g);
                    d[i + 2] = v * col1_rgb.b + ((1.0 - v) * col2_rgb.b);
                    d[i + 3] = 255;
                }
            var after = new Date().getTime();
            //console.log("noise: " + (after-before));
            ctx.putImageData(imgData, 0, 0);
        }
        update() {
            this.setPerlinNoise(this._ctx, {});
        }
        get color1() {
            return this._color1;
        }
        set color1(c) {
            this._color1 = c;
            this.update();
        }
        get color2() {
            return this._color2;
        }
        set color2(c) {
            this._color2 = c;
            this.update();
        }
        get octaves() {
            return this._octaves;
        }
        set octaves(o) {
            this._octaves = o;
            this.update();
        }
        get persistence() {
            return this._persistence;
        }
        set persistence(o) {
            this._persistence = o;
            this.update();
        }
        get scale() {
            return this._scale;
        }
        set scale(o) {
            this._scale = o;
            this.update();
        }
        get seed() {
            return this._seed;
        }
        set seed(o) {
            this._seed = o;
            this.update();
        }
        get percentage() {
            return this._percentage;
        }
        set percentage(o) {
            this._percentage = o;
            this.update();
        }
        get type() {
            return this._type;
        }
        set type(o) {
            this._type = o;
            this.update();
        }
    }
    BABYLONX.NoiseGen = NoiseGen;
    class TexGen {
        constructor() {
            this._brick_color = "#b90000";
            this._grout_color = "#e4ff66";
            this._gradient_color = "#000000";
            this._brick_gradient = 3;
            this._number = 0;
            this._width = 32;
            this._height = 32;
            this._numWidth = 8;
            this._numHeight = 8;
        }
        rational_tanh(x) {
            if (x < -3)
                return -1;
            else if (x > 3)
                return 1;
            else
                return x * (27 + x * x) / (27 + 9 * x * x);
        }
        calcTextilesPattern(x, y, patterndirection, patternpart, facetlength, delta_in, smoothness, offset, steepness, depth, round) {
            var PatternPart = {
                TOP: 0,
                MIDDLE: 1,
                BOTTOM: 2,
                BLOCK: 3
            };
            var PatternDirection = {
                HORIZONTAL: 0,
                VERTICAL: 1
            };
            var delta = 1.0 / (8.0 - delta_in);
            var TwistTrajectory = ((Math.asin(2.0 * y - 1.0) / (Math.PI / 2.0) + 1.0) * facetlength) / 2.0;
            var displacement = 2.0 * ((x + TwistTrajectory) - (x + TwistTrajectory) / delta * delta) / delta - 1.0; // added an extra "/ delta " to fix sth
            var rand_value = Math.random() * delta; // [0, delta)
            var pdisplacement = smoothness * displacement + (1.0 - smoothness) * rand_value;
            //console.log(pdis_quad);
            var TwistShading = Math.exp(-Math.abs(Math.pow(pdisplacement * depth, round ? 2 : 1)));
            var YShading = offset + (1.0 - offset) * Math.sin(y * Math.PI);
            /*if (patterndirection == PatternDirection.HORIZONTAL){
                if ((patternpart == PatternPart.TOP && x < 0.5)
                    || (patternpart == PatternPart.BOTTOM && x > 0.5)
                    || (patternpart == PatternPart.BLOCK))
                    YShading = offset + (1.0 - offset) * Math.sin(y * Math.PI);
                else
                    YShading = 1;
            }*/
            var tanh_value = 0.5 * steepness;
            //var tanh = (Math.exp(tanh_value) - Math.exp(-tanh_value)) / (Math.exp(tanh_value) + Math.exp(-tanh_value));
            var shading_border = 0.5;
            if (patterndirection == PatternDirection.VERTICAL)
                if ((patternpart == PatternPart.TOP && x < shading_border)
                    || (patternpart == PatternPart.BOTTOM && x > shading_border)
                    || (patternpart == PatternPart.BLOCK)) {
                    if (x < shading_border)
                        tanh_value = x * steepness;
                    else if (x > shading_border)
                        tanh_value = (1.0 - x) * steepness;
                }
            if (patterndirection == PatternDirection.HORIZONTAL)
                if ((patternpart == PatternPart.TOP && x < shading_border)
                    || (patternpart == PatternPart.BOTTOM && x > shading_border)
                    || (patternpart == PatternPart.BLOCK))
                    if (x < shading_border)
                        tanh_value = x * steepness;
                    else if (x > shading_border)
                        tanh_value = (1.0 - x) * steepness;
            var XShading = offset + (1.0 - offset) * this.rational_tanh(tanh_value);
            //XShading = XShading * (x < 0.5 ? (1 - x) : x)
            var ThreadShading = TwistShading * XShading * YShading;
            return ThreadShading;
        }
        createTextilesPattern(canvas, patterndirection, patternpart, width, height, facetlength, delta, smoothness, offset, steepness, depth, round, col, col_bg) {
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            var imgData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data1 = imgData1.data;
            var PatternDirection = {
                HORIZONTAL: 0,
                VERTICAL: 1
            };
            for (var x = 0; x < canvas.width; x++) {
                for (var y = 0; y < canvas.height; y++) {
                    var first = (patterndirection == PatternDirection.VERTICAL ? y / canvas.height : x / canvas.width);
                    var second = (patterndirection == PatternDirection.VERTICAL ? x / canvas.height : y / canvas.width);
                    var v = this.calcTextilesPattern(first, second, patterndirection, patternpart, facetlength, delta, smoothness, offset, steepness, depth, round);
                    data1[(x + y * canvas.width) * 4 + 0] = v * col.r + ((1.0 - v) * col_bg.r);
                    data1[(x + y * canvas.width) * 4 + 1] = v * col.g + ((1.0 - v) * col_bg.g);
                    data1[(x + y * canvas.width) * 4 + 2] = v * col.b + ((1.0 - v) * col_bg.b);
                    data1[(x + y * canvas.width) * 4 + 3] = 255;
                }
            }
            ctx.putImageData(imgData1, 0, 0);
            //ctx.scale( max_w/ img.width, img.height);
            //ctx.drawImage(canvas, 0,0);
            return ctx.createPattern(canvas, "repeat");
        }
        setTextiles(ctx, img, max_w, max_h, scale, col1_rgb, col2_rgb, col_bg, facetlength, delta, smoothness, offset, steepness, depth, round) {
            var PatternPart = {
                TOP: 0,
                MIDDLE: 1,
                BOTTOM: 2,
                BLOCK: 3
            };
            var PatternDirection = {
                HORIZONTAL: 0,
                VERTICAL: 1
            };
            var width = max_w / (img.width * scale) + 0.5;
            var height = max_h / (img.height * scale) + 0.5;
            var c_p1_block = document.createElement('canvas');
            var pat1_block = this.createTextilesPattern(c_p1_block, PatternDirection.VERTICAL, PatternPart.BLOCK, width, height, facetlength, delta, smoothness, offset, steepness, depth, round, col1_rgb, col_bg);
            var c_p1_middle = document.createElement('canvas');
            var pat1_middle = this.createTextilesPattern(c_p1_middle, PatternDirection.VERTICAL, PatternPart.MIDDLE, width, height, facetlength, delta, smoothness, offset, steepness, depth, round, col1_rgb, col_bg);
            var c_p1_top = document.createElement('canvas');
            var pat1_top = this.createTextilesPattern(c_p1_top, PatternDirection.VERTICAL, PatternPart.TOP, width, height, facetlength, delta, smoothness, offset, steepness, depth, round, col1_rgb, col_bg);
            var c_p1_bottom = document.createElement('canvas');
            var pat1_bottom = this.createTextilesPattern(c_p1_bottom, PatternDirection.VERTICAL, PatternPart.BOTTOM, width, height, facetlength, delta, smoothness, offset, steepness, depth, round, col1_rgb, col_bg);
            var c_p2_block = document.createElement('canvas');
            var pat2_block = this.createTextilesPattern(c_p2_block, PatternDirection.HORIZONTAL, PatternPart.BLOCK, height, width, facetlength, delta, smoothness, offset, steepness, depth, round, col2_rgb, col_bg);
            var c_p2_middle = document.createElement('canvas');
            var pat2_middle = this.createTextilesPattern(c_p2_middle, PatternDirection.HORIZONTAL, PatternPart.MIDDLE, height, width, facetlength, delta, smoothness, offset, steepness, depth, round, col2_rgb, col_bg);
            var c_p2_top = document.createElement('canvas');
            var pat2_top = this.createTextilesPattern(c_p2_top, PatternDirection.HORIZONTAL, PatternPart.TOP, height, width, facetlength, delta, smoothness, offset, steepness, depth, round, col2_rgb, col_bg);
            var c_p2_bottom = document.createElement('canvas');
            var pat2_bottom = this.createTextilesPattern(c_p2_bottom, PatternDirection.HORIZONTAL, PatternPart.BOTTOM, height, width, facetlength, delta, smoothness, offset, steepness, depth, round, col2_rgb, col_bg);
            var c_ptrn = document.createElement('canvas');
            var ctx_ptrn = c_ptrn.getContext('2d');
            ctx_ptrn.imageSmoothingEnabled = false;
            for (var i = 0; i < scale; i++) {
                ctx_ptrn.drawImage(img, 0, 0, img.width, img.height);
                if (i >= 1) {
                    for (var x = 0; x < i; x++)
                        ctx_ptrn.drawImage(img, img.width * x, img.height * i, img.width, img.height);
                    for (var y = 0; y < i; y++)
                        ctx_ptrn.drawImage(img, img.width * i, img.height * y, img.width, img.height);
                    ctx_ptrn.drawImage(img, img.width * i, img.height * i, img.width, img.height);
                }
            }
            var imgData3 = ctx_ptrn.getImageData(0, 0, img.width * scale, img.height * scale);
            var data3 = imgData3.data;
            //console.log(img.width);
            //ctx.fillStyle = pat1;
            //ctx.fillRect(0, 0, max_w / img.width, max_h / img.height);
            var width_mul = max_w / imgData3.width;
            var height_mul = max_h / imgData3.height;
            for (var y = 0; y < imgData3.height; y++) {
                for (var x = 0; x < imgData3.width; x++) {
                    var pos = x * 4 + y * imgData3.width * 4 + 0;
                    // vertical color
                    if (data3[pos] == 0) {
                        var top = x * 4 + ((y - 1) < 0 ? y - 1 + imgData3.width : y - 1) * imgData3.width * 4;
                        var bottom = x * 4 + ((y + 1) == imgData3.width ? 0 : y + 1) * imgData3.width * 4;
                        if (data3[top] == 0 && data3[bottom] == 0) {
                            ctx.fillStyle = pat1_middle;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else if (data3[top] == 0 && data3[bottom] != 0) {
                            ctx.fillStyle = pat1_bottom;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else if (data3[top] != 0 && data3[bottom] == 0) {
                            ctx.fillStyle = pat1_top;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else {
                            ctx.fillStyle = pat1_block;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                    }
                    else {
                        var left = ((x - 1) < 0 ? x - 1 + imgData3.width : x - 1) * 4 + y * imgData3.width * 4;
                        var right = ((x + 1) == imgData3.width ? 0 : x + 1) * 4 + y * imgData3.width * 4;
                        if (data3[left] != 0 && data3[right] == 0) {
                            ctx.fillStyle = pat2_bottom;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else if (data3[left] == 0 && data3[right] != 0) {
                            ctx.fillStyle = pat2_top;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else if (data3[left] != 0 && data3[right] != 0) {
                            ctx.fillStyle = pat2_middle;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                        else {
                            ctx.fillStyle = pat2_block;
                            ctx.fillRect(x * width_mul, y * height_mul, width_mul, height_mul);
                        }
                    }
                }
            }
            /*
            var helper = function (fn) {
                'use strict';
                fn();
            }
            var do_strict=function() {
                delete c_p1_block;
                delete c_p1_middle;
                delete c_p1_top;
                delete c_p1_bottom;

                delete c_p2_block;
                delete c_p2_middle;
                delete c_p2_top;
                delete c_p2_bottom;

                delete c_ptrn;
                delete img;
            }
            helper(do_strict);
            */
        }
        ;
        drawBrickRectangle(ctx, groutspace, brick_gradient, brick_col, brick_grout_col, gradient_color, x, y, w, h) {
            brick_gradient = Math.min(brick_gradient, Math.min((h - groutspace * 2) / 2, (w - groutspace * 2) / 2));
            /*
            ctx.fillStyle = brick_grout_col;
            ctx.fillRect(x, Math.max(y,0), w, h);
            
            ctx.fillStyle = brick_col;
            ctx.fillRect(x + groutspace, y + groutspace < 0 ? 0 : y + groutspace , w - groutspace*2, y + groutspace < 0 ? h - groutspace : h - groutspace*2);
            */
            ctx.fillStyle = brick_grout_col;
            ctx.fillRect(x, Math.max(y, 0), w, h);
            var grad = ctx.createLinearGradient(0, y, 0, y + h);
            var max_d = h;
            grad.addColorStop(0, brick_grout_col);
            grad.addColorStop(groutspace / max_d, brick_grout_col);
            grad.addColorStop(groutspace / max_d, gradient_color);
            grad.addColorStop((groutspace + brick_gradient) / max_d, brick_col);
            grad.addColorStop((h - groutspace - brick_gradient) / max_d, brick_col);
            grad.addColorStop((h - groutspace) / max_d, gradient_color);
            grad.addColorStop((h - groutspace) / max_d, brick_grout_col);
            grad.addColorStop(1.0, brick_grout_col);
            ctx.fillStyle = grad;
            ctx.fillRect(x + groutspace, y + groutspace < 0 ? 0 : y + groutspace, w - groutspace * 2, y + groutspace < 0 ? h - groutspace : h - groutspace * 2);
            //ctx.fillStyle = gradient([0, y, 0, h], ctx, y, groutspace, brick_col, brick_grout_col, gradient_color);
            //ctx.fillRect(x, y, w, h);
            ctx.save();
            var mid_x = w / 2 + x;
            var mid_y = h / 2 + y;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + groutspace, y + groutspace);
            ctx.lineTo(x + groutspace + brick_gradient, y + groutspace + brick_gradient);
            ctx.lineTo(mid_x, mid_y);
            ctx.lineTo(w + x - brick_gradient - groutspace, h + y - brick_gradient - groutspace);
            ctx.lineTo(w + x - brick_gradient, h + y - brick_gradient);
            ctx.lineTo(w + x, y + h);
            ctx.lineTo(w + x, y);
            ctx.lineTo(w + x - groutspace, y + groutspace);
            ctx.lineTo(w + x - brick_gradient - groutspace, y + groutspace + brick_gradient);
            ctx.lineTo(mid_x, mid_y);
            ctx.lineTo(x + brick_gradient + groutspace, h + y - brick_gradient - groutspace);
            ctx.lineTo(x + groutspace, h + y - groutspace);
            ctx.lineTo(x, h + y);
            ctx.lineTo(x, y);
            ctx.clip();
            grad = ctx.createLinearGradient(x, 0, x + w, 0);
            max_d = w;
            grad.addColorStop(0, brick_grout_col);
            grad.addColorStop(groutspace / max_d, brick_grout_col);
            grad.addColorStop(groutspace / max_d, gradient_color);
            grad.addColorStop((groutspace + brick_gradient) / max_d, brick_col);
            grad.addColorStop((w - groutspace - brick_gradient) / max_d, brick_col);
            grad.addColorStop((w - groutspace) / max_d, gradient_color);
            grad.addColorStop((w - groutspace) / max_d, brick_grout_col);
            grad.addColorStop(1.0, brick_grout_col);
            ctx.fillStyle = grad;
            //ctx.fillStyle = gradient([x, 0, w, 0], ctx, tile_part_x, hori_gap, x_tiles_gradient, tile_col_hex, grout_col_hex, tiles_smooth_col, grout_gradient_color);
            ctx.fillRect(x + groutspace, y + groutspace < 0 ? 0 : y + groutspace, w - groutspace * 2, y + groutspace < 0 ? h - groutspace : h - groutspace * 2);
            ctx.restore();
        }
        createPattern(ctx, options) {
            switch (this._number) {
                case 0:
                    this.createStraightPattern(ctx, options);
                    break;
                case 1:
                    this.createWideBlockPattern(ctx, options);
                    break;
                case 2:
                    this.createBlockPattern(ctx, options);
                    break;
            }
        }
        createStraightPattern(ctx, options) {
            this._ctx = ctx;
            this._width = options.width || this._width;
            this._height = options.height || this._height;
            this._numWidth = options.numWidth || this._numWidth;
            this._numHeight = options.numHeight || this._numHeight;
            var groutspace = options.groutspace || 1;
            this._brick_gradient = options.brick_gradient || this._brick_gradient;
            this._brick_color = options.brick_color || this._brick_color;
            this._grout_color = options.grout_color || this._grout_color;
            this._gradient_color = options.gradient_color || this._gradient_color;
            var half_height = this._height / 2.0 + 0.5;
            for (var y = 0; y < this._numHeight + 1; y++) {
                for (var x = 0; x < this._numWidth + 1; x++) {
                    if (x % 2 == 1) {
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._gradient_color, x * this._width, y * this._height - half_height, this._width, this._height);
                    }
                    else
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._gradient_color, x * this._width, y * this._height, this._width, this._height);
                }
            }
        }
        createBlockPattern(ctx, options) {
            this._ctx = ctx;
            this._width = options.width || this._width;
            this._height = options.height || this._height;
            this._numWidth = options.numWidth || this._numWidth;
            this._numHeight = options.numHeigth || this._numHeight;
            this._grout_color = options.grout_color || this._grout_color;
            var groutspace = options.groutspace || 1;
            this._brick_gradient = options.brick_gradient || this._brick_gradient;
            this._brick_color = options.brick_color || this._brick_color;
            var width = this._width / 2.0 + 0.5;
            var height = this._height / 2.0 + 0.5;
            var count_y = this._numHeight * 2;
            var count_x = this._numWidth * 2;
            ctx.fillStyle = this._grout_color;
            ctx.fillRect(0, 0, 256, 256);
            for (var y = 0; y < count_y + 1; y += 2) {
                for (var x = 0; x < count_x + 1; x += 3) {
                    if ((x + y) % 4 == 0) {
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width, y * height, width, height * 2);
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width + width, y * height, width, height);
                    }
                    else {
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width, y * height, width * 2, height);
                        this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width, y * height + height, width * 2, height);
                    }
                }
            }
        }
        createWideBlockPattern(ctx, options) {
            this._ctx = ctx;
            this._width = options.width || this._width;
            this._height = options.height || this._height;
            this._numWidth = options.numWidth || this._numWidth;
            this._numHeight = options.numHeigth || this._numHeight;
            this._grout_color = options.grout_color || this._grout_color;
            var groutspace = options.groutspace || 1;
            this._brick_gradient = options.brick_gradient || this._brick_gradient;
            this._brick_color = options.brick_color || this._brick_color;
            var width = this._width / 2.0 + 0.5;
            var height = this._height / 2.0 + 0.5;
            var count_y = this._numHeight * 2;
            var count_x = this._numWidth * 2;
            ctx.fillStyle = this._grout_color;
            ctx.fillRect(0, 0, 256, 256);
            for (var y = 0; y < count_y + 1; y += 2) {
                for (var x = 0; x < count_x + 1; x += 3) {
                    this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width, y * height, width, height * 2);
                    this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width + width, y * height, width * 2, height);
                    this.drawBrickRectangle(ctx, groutspace, this._brick_gradient, this._brick_color, this._grout_color, this._grout_color, x * width + width, y * height + height, width * 2, height);
                }
            }
        }
        set brick_gradient(g) {
            this._brick_gradient = g;
            this.createPattern(this._ctx, {});
        }
        get brick_gradient() {
            return this._brick_gradient;
        }
        set brick_color(c) {
            this._brick_color = c;
            this.createPattern(this._ctx, {});
        }
        get brick_color() {
            return this._brick_color;
        }
        set grout_color(c) {
            this._grout_color = c;
            this.createPattern(this._ctx, {});
        }
        get grout_color() {
            return this._grout_color;
        }
        set gradient_color(c) {
            this._gradient_color = c;
            this.createPattern(this._ctx, {});
        }
        get gradient_color() {
            return this._gradient_color;
        }
        get number() {
            return this._number;
        }
        set number(n) {
            this._number = n;
            this.createPattern(this._ctx, {});
        }
        get width() {
            return this._width;
        }
        set width(n) {
            this._width = n;
            this.createPattern(this._ctx, {});
        }
        get height() {
            return this._height;
        }
        set height(n) {
            this._height = n;
            this.createPattern(this._ctx, {});
        }
        get numWidth() {
            return this._numWidth;
        }
        set numWidth(n) {
            this._numWidth = n;
            this.createPattern(this._ctx, {});
        }
        get numHeight() {
            return this._numHeight;
        }
        set numHeight(n) {
            this._numHeight = n;
            this.createPattern(this._ctx, {});
        }
    }
    BABYLONX.TexGen = TexGen;
    class RandomEffector {
        constructor(seed = 42) {
            this._strength = 0.0;
            this._position = new BABYLON.Vector3(0, 0, 0);
            this._rotation = new BABYLON.Vector3(0, 0, 0);
            this._scale = new BABYLON.Vector3(0, 0, 0);
            this._uniformScale = false;
            this._clients = [];
            this._seed = this._s = seed;
            this._rfunction = function () {
                this._s = Math.sin(this._s) * 10000;
                return this._s - Math.floor(this._s);
            };
        }
        random() {
            return this._rfunction();
        }
        reset() {
            this._s = this._seed;
        }
        updateRotation(vec) {
            var m1 = this._rotation.multiplyByFloats((-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength);
            return vec.add(m1);
        }
        updatePosition(vec) {
            var m1 = this._position.multiplyByFloats((-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength);
            return vec.add(m1);
        }
        updateScale(vec) {
            let a = this.random();
            let b = a;
            let c = a;
            if (this._uniformScale == false) {
                b = this.random();
                c = this.random();
            }
            var m1 = this._scale.multiplyByFloats((-.5 + a) * this._strength, (-.5 + b) * this._strength, (-.5 + b) * this._strength);
            //var m1=this._scale.multiplyByFloats(this._strength,this._strength,this._strength);
            return vec.add(m1);
        }
        addClient(c) {
            this._clients.push(c);
        }
        updateClients() {
            this._clients.forEach(function (c) { c.update(); });
            return this;
        }
        get strength() {
            return this._strength;
        }
        set strength(s) {
            this._strength = s;
        }
        str(s) {
            this.strength = s;
            return this;
        }
        set position(p) {
            this._position.x = p.x;
            this._position.y = p.y;
            this._position.z = p.z;
        }
        get position() {
            return this._position;
        }
        set scale(s) {
            this._scale.x = this._scale.y = this._scale.z = s.x;
            if (this._uniformScale == false) {
                this._scale.y = s.y;
                this._scale.z = s.z;
            }
        }
        get scale() {
            return this._scale;
        }
        set rotation(s) {
            this._rotation.x = s.x * Math.PI / 180;
            this._rotation.y = s.y * Math.PI / 180;
            this._rotation.z = s.z * Math.PI / 180;
        }
        get rotation() {
            return this._rotation;
        }
        rot(s) {
            this.rotation = s;
            return this;
        }
        pos(p) {
            this.position = p;
            return this;
        }
        set seed(s) {
            this._seed = this._s = s;
        }
        get seed() {
            return this._seed;
        }
        set uniformScale(flag) {
            this._uniformScale = flag;
        }
        get uniformScale() {
            return this._uniformScale;
        }
        getRandomColor() {
            return this.random();
        }
        getRandomInt({ min = 0, max = 10 } = {}) {
            return min + Math.floor(this.random() * (max - min));
        }
    }
    BABYLONX.RandomEffector = RandomEffector;
    class RandomNumberGen {
        constructor({ min = 0, max = 10, seed = 1234 } = {}) {
            this._min = min;
            this._max = max;
            this._generator = new RandomEffector(seed);
            return this;
        }
        nextInt() {
            return this._generator.getRandomInt({
                min: this._min, max: this._max
            });
        }
    }
    BABYLONX.RandomNumberGen = RandomNumberGen;
    class RainbowPalette {
        static getColor(index, frame) {
            let pi2 = Math.PI;
            let off = Math.sin(frame * 0.01);
            let aa = Math.sin((index + 0.05 + off) * pi2);
            let bb = Math.sin((index + 0.34 + off) * pi2);
            let cc = Math.sin((index + 0.66 + off) * pi2);
            return {
                r: aa * aa, g: bb * bb, b: cc * cc
            };
        }
    }
    BABYLONX.RainbowPalette = RainbowPalette;
    class ColorEffector {
        constructor() {
            this._autoanimate = true;
            this._reverse = false;
            this._framerate = 1 / 50;
            return this;
        }
        static cubicPulse(c, w, x) {
            x = Math.abs(x - c);
            if (x < w)
                return 0.0;
            return 1.0 - x * x * (3.0 - 2.0 * x);
        }
        static smoothstep(min, max, value) {
            var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
            return x * x * (3 - 2 * x);
        }
        ;
        auto(ani) {
            this._autoanimate = ani;
            return this;
        }
        reverse(rev) {
            this._reverse = rev;
            return this;
        }
        framerate(fr) {
            fr = fr < 0 ? 1 : fr;
            this._framerate = 1 / fr;
            return this;
        }
        animate(index, frame) {
            return ColorEffector.getColor(this._reverse ? index : (1 - index), frame, this._autoanimate ? frame * this._framerate / Math.PI : 0);
        }
        static getColor(index, frame, offset = 0) {
            let pi2 = Math.PI;
            let aa = Math.sin((index + 0.05 + offset) * pi2);
            let bb = Math.sin((index + 0.34 + offset) * pi2);
            let cc = Math.sin((index + 0.66 + offset) * pi2);
            //let aa = 1-ColorEffector.cubicPulse(aaa * aaa, 0.05,index );//* Math.sin((index + 0.05 + offset) * pi2);
            //let bb = 1-ColorEffector.cubicPulse(bbb * bbb, 0.05,index );//ColorEffector.cubicPulse(index, 0.02, 1+Math.sin(frame * 0.01)) *Math.sin((index + 0.34 + offset) * pi2);
            //let cc = 1-ColorEffector.cubicPulse(ccc * ccc, 0.05,index);//ColorEffector.cubicPulse(index, 0.02, 1+Math.sin(frame * 0.01)) *Math.sin((index + 0.66 + offset) * pi2);
            //frame = 66;
            let fx = (frame % 120) / 120; //  Math.abs(Math.cos(Math.sin(frame * 0.1)));
            let ping = Math.abs(index - fx) > 1 / 140 ? .99 : 0;
            let ix = Math.max(0, Math.min((ping), 1)); //-1+index*2;
            let a = ping; //ix;//ColorEffector.smoothstep(ix - .31, ix, fx) - ColorEffector.smoothstep(ix, ix + .31, fx);
            //let a = 1-ColorEffector.cubicPulse(index, .1, fx);
            return {
                r: aa * aa, g: bb * bb, b: cc * cc, a: a
            };
        }
        get autoanimate() {
            return this._autoanimate;
        }
        set autoanimate(auto) {
            this._autoanimate = auto;
        }
    }
    BABYLONX.ColorEffector = ColorEffector;
    class Cloner {
        constructor() {
            this._rootNode = null;
            this._effectors = [];
        }
        setEnabled(enabled) {
            this._rootNode.setEnabled(enabled);
        }
        createClone(parent) { }
        update() { }
        addEffector(effector, sensitivity) {
            this._effectors.push({ effector: effector, sensitivity: sensitivity });
            effector.addClient(this);
            this.update();
        }
        get effectors() {
            return this._effectors;
        }
        eScale(vec) {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updateScale(vRet), this._effectors[i].sensitivity);
            }
            return vRet;
        }
        eRotate(vec) {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updateRotation(vRet), this._effectors[i].sensitivity);
            }
            return vRet;
        }
        ePosition(vec) {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updatePosition(vRet), this._effectors[i].sensitivity);
            }
            return vRet; // BABYLON.Vector3.Lerp(vec,vRet,this._effectorStrength.x);
        }
        eReset() {
            this._effectors.forEach(function (e) { e.effector.reset(); });
        }
        getScene() {
            return this._scene;
        }
    }
    Cloner.vOne = new BABYLON.Vector3(1, 1, 1);
    Cloner.vZero = new BABYLON.Vector3(0, 0, 0);
    BABYLONX.Cloner = Cloner;
    class RadialCloner extends Cloner {
        /**
         *
         * @param mesh mesh to clone
         * @param scene
         * @param param2 all optional: count, offset, radius startangle, endangle, useInstances, plane,colorize
         * if colorize function is provided, useInstances is set to false!
         */
        constructor(mesh, scene, { count = 3, offset = 0, radius = 3, align = true, startangle = 0, endangle = 360, useInstances = true, plane = { x: 1, y: 0, z: 1 }, colorize = null } = {}) {
            super();
            RadialCloner.instance_nr = 0 | (RadialCloner.instance_nr + 1);
            this._instance_nr = RadialCloner.instance_nr;
            this._mesh = mesh;
            this._mesh.forEach(function (m) { m.setEnabled(false); });
            this._scene = scene;
            this._useInstances = useInstances;
            this._clones = [];
            this._count = Number(count);
            this._radius = Number(radius);
            this._plane = new BABYLON.Vector3(plane.x, plane.y, plane.z);
            this._startangle = Math.PI * startangle / 180;
            this._endangle = Math.PI * endangle / 180;
            this._offset = offset;
            this._align = align;
            this._frame = 0;
            this._index = 0;
            this._colorize = colorize;
            if (colorize != null)
                this._useInstances = false;
            this._formula = "2-Math.pow(Math.abs(Math.sin(frame/10+Math.PI*i/2)),0.1)*1.5";
            this._formula = "scaling=1-Math.sin(frame/6+2*ix*Math.PI)/2";
            //this._rootNode=new CMesh("root",this._scene,this);
            this._rootNode = new CMesh(`rootRC_${this._instance_nr}`, this._scene, null, this);
            this._scene.registerBeforeRender(() => {
                this._frame++;
                this._index = 0;
            });
            this.createClones();
            this.update();
        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new RadialCloner(this._mesh, this._scene, { count: this._count, offset: this._offset, radius: this._radius, startangle: this._startangle * 180 / Math.PI, endangle: this._endangle * 180 / Math.PI, useInstances: this._useInstances, plane: { x: this._plane.x, y: this._plane.y, z: this._plane.z } });
            parent._cloner = c;
            c.root.parent = parent;
            return c.root;
        }
        createClones(start = 0) {
            for (let i = start; i < this._count; i++) {
                //create Node for each clone, RADIAL=>parent = rootnode 
                var n = new CMesh(`n_rc${this._instance_nr}_${i}`, this._scene, this._rootNode);
                n._index = i;
                this._clones.push(n);
                //create clone
                let cix = i % this._mesh.length;
                let c = n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_rc${this._instance_nr}_${i}`);
                if (this._colorize != null) {
                    c.registerBeforeRender(() => {
                        let color = this._colorize.animate(c.parent._index / this._count, this._frame);
                        c.material.diffuseColor.r = color.r;
                        c.material.diffuseColor.g = color.g;
                        c.material.diffuseColor.b = color.b;
                        //if (color.r < 0.5)
                        c.material.alpha = color.a;
                    });
                }
            }
        }
        calcRot() {
            for (let i = 0; i < this._count; i++) {
                let arange = this._endangle - this._startangle;
                let step = arange / this._count;
                this._clones[i].getChildren()[0].rotation.x = this._clones[i].getChildren()[0].rotation.y = this._clones[i].getChildren()[0].rotation.z = 0;
                if (this._plane.y === 0) {
                    this._clones[i].getChildren()[0].rotation.y = this._align ? this._offset + this._startangle + i * step : 0;
                }
                else if (this._plane.x === 0) {
                    this._clones[i].getChildren()[0].rotation.x = this._align ? -this._offset - this._startangle - i * step : 0;
                }
                else {
                    this._clones[i].getChildren()[0].rotation.z = this._align ? -this._offset - this._startangle - i * step : 0;
                }
                let vRet = this.eRotate(this._clones[i].getChildren()[0].rotation);
                this._clones[i].getChildren()[0].rotation = vRet;
            }
        }
        calcSize() {
            for (let i = 0; i < this._count; i++) {
                //var orig=BABYLON.Vector3.Lerp(Cloner.vOne, this._S, this._iModeRelative ? i : i / (this._count - 1));
                this._clones[i].getChildren()[0].scaling = this.eScale(Cloner.vOne);
            }
        }
        calcPos() {
            this.eReset();
            for (let i = 0; i < this._count; i++) {
                let arange = this._endangle - this._startangle;
                let step = arange / this._count;
                this._clones[i].position.x = this._clones[i].position.y = this._clones[i].position.z = 0;
                //this._clones[i].getChildren()[0].rotation.x = this._clones[i].getChildren()[0].rotation.y = this._clones[i].getChildren()[0].rotation.z = 0;
                if (this._plane.y === 0) {
                    this._clones[i].position.x = Math.sin(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position.z = Math.cos(this._offset + this._startangle + i * step) * this._radius;
                    //console.log(this._clones[i].position);
                    this._clones[i].position = this.ePosition(this._clones[i].position);
                }
                else if (this._plane.x === 0) {
                    this._clones[i].position.y = Math.sin(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position.z = Math.cos(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position = this.ePosition(this._clones[i].position);
                }
                else {
                    this._clones[i].position.x = Math.sin(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position.y = Math.cos(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position = this.ePosition(this._clones[i].position);
                }
            }
        }
        update() {
            this.calcRot();
            this.calcPos();
            this.calcSize();
        }
        delete() {
            for (let i = this._count - 1; i >= 0; i--) {
                this._clones[i].delete();
            }
            this._rootNode.dispose();
        }
        recalc() {
            var cnt = this._count;
            this.count = 0;
            this.count = cnt;
        }
        set count(scnt) {
            let cnt = Number(scnt);
            if (cnt < Number(this._count)) {
                for (let i = this._count - 1; i >= cnt; i--) {
                    this._clones[i].delete();
                }
                this._count = cnt;
                this._clones.length = cnt;
            }
            else if (cnt > Number(this._count)) {
                var start = this._count;
                this._count = cnt;
                this.createClones(start);
            }
            this.update();
        }
        get count() {
            return this._count;
        }
        set offset(off) {
            this._offset = Math.PI * off / 180;
            this.update();
        }
        get offset() {
            return this._offset * 180 / Math.PI;
        }
        get root() {
            return this._rootNode;
        }
        set radius(r) {
            this._radius = r;
            this.update();
        }
        get radius() {
            return this._radius;
        }
        set align(a) {
            this._align = a;
            this.update();
        }
        get align() {
            return this._align;
        }
        set startangle(sa) {
            this._startangle = Math.PI * sa / 180;
            this.update();
        }
        get startangle() {
            return this._startangle * 180 / Math.PI;
        }
        set endangle(se) {
            this._endangle = Math.PI * se / 180;
            this.update();
        }
        get endangle() {
            return this._endangle * 180 / Math.PI;
        }
        set plane(p) {
            this._plane = new BABYLON.Vector3(p.x, p.y, p.z);
            this.update();
        }
        setScaling(ix, sc) {
            this._clones[ix].scaling = new BABYLON.Vector3(sc.x, sc.y, sc.z);
            this.update();
        }
    }
    BABYLONX.RadialCloner = RadialCloner;
    class ObjectCloner extends Cloner {
        constructor(mesh, template, scene, { useInstances = true } = {}) {
            super();
            this._useInstances = true;
            ObjectCloner.instance_nr = 0 | (ObjectCloner.instance_nr + 1);
            this._mesh = mesh;
            this._scene = scene;
            this._template = template;
            this._useInstances = useInstances;
            this._clones = [];
            this._positions = template.getFacetLocalPositions();
            this._normals = template.getFacetLocalNormals();
            this._template.isVisible = false; //  setEnabled(false);
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            });
            this._instance_nr = ObjectCloner.instance_nr;
            this._rootNode = new CMesh(`rootOC_${ObjectCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.calcPos();
        }
        createClones(start = 0) {
            var cix = 0;
            this._count = this._positions.length;
            for (let i = 0; i < this._positions.length; i++) {
                cix = i % this._mesh.length;
                var n = new CMesh(`n_lc${ObjectCloner.instance_nr}_${i}`, this._scene, this._rootNode);
                this._clones.push(n);
                n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_mc${ObjectCloner.instance_nr}_${i}`);
            }
        }
        calcRot() {
            for (let i = 0; i < this._count; i++) {
                let vRet = this.eRotate(Cloner.vZero);
                this._clones[i].getChildren()[0].rotation = vRet;
            }
        }
        calcSize() {
            for (let i = 0; i < this._count; i++) {
                this._clones[i].scaling = this.eScale(Cloner.vOne);
            }
        }
        calcPos() {
            this.eReset();
            for (let i = 0; i < this._clones.length; i++) {
                this._clones[i].position = this.ePosition(this._positions[i]);
            }
        }
        update() {
            if (this._count > 0) {
                this.calcRot();
                this.calcPos();
                this.calcSize();
            }
        }
        get root() {
            return this._rootNode;
        }
    }
    BABYLONX.ObjectCloner = ObjectCloner;
    class MatrixCloner extends Cloner {
        constructor(mesh, scene, { useInstances = true, mcount = { x: 3, y: 3, z: 3 }, size = { x: 2, y: 2, z: 2 }, iModeRelative = false } = {}) {
            super();
            MatrixCloner.instance_nr = 0 | (MatrixCloner.instance_nr + 1);
            this._mesh = mesh;
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            });
            this._scene = scene,
                this._useInstances = useInstances;
            this._clones = [];
            this._size = size;
            this._mcount = mcount;
            this._count = Number(mcount.x * mcount.y * mcount.z);
            this._iModeRelative = iModeRelative;
            this._instance_nr = MatrixCloner.instance_nr;
            this._rootNode = new CMesh(`rootMC_${MatrixCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();
        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new MatrixCloner(this._mesh, this._scene, { mcount: this._mcount, size: this._size });
            parent._cloner = c;
            c.root.parent = parent;
            return c.root;
        }
        createClones(start = 0) {
            var cix = 0;
            for (let z = start; z < this._mcount.z; z++) {
                for (let y = start; y < this._mcount.y; y++) {
                    for (let x = start; x < this._mcount.x; x++) {
                        var n = new CMesh(`n_lc${MatrixCloner.instance_nr}_${x}${y}${z}`, this._scene, this._rootNode);
                        this._clones.push(n);
                        var xyz = x + this._mcount.x * y + this._mcount.x * this._mcount.y * z;
                        cix = xyz % this._mesh.length;
                        n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_mc${MatrixCloner.instance_nr}_${x}${y}${z}`);
                    }
                }
            }
            this.calcPos();
        }
        set mcount(m) {
            this._mcount = m;
            this.delete();
            this._count = Number(this._mcount.x * this._mcount.y * this._mcount.z);
            this.createClones();
        }
        get mcount() {
            return this._mcount;
        }
        get state() {
            return {
                mcount: {
                    x: this._mcount.x,
                    y: this._mcount.y,
                    z: this._mcount.z,
                },
                size: {
                    x: this._size.x,
                    y: this._size.y,
                    z: this._size.z
                }
            };
        }
        set size(s) {
            this._size = s;
            this.update();
        }
        get size() {
            return this._size;
        }
        calcRot() {
            for (let i = 0; i < this._count; i++) {
                let vRet = this.eRotate(Cloner.vZero);
                this._clones[i].getChildren()[0].rotation = vRet;
            }
        }
        calcSize() {
            for (let i = 0; i < this._count; i++) {
                this._clones[i].getChildren()[0].scaling = this.eScale(Cloner.vOne);
            }
        }
        calcPos() {
            this.eReset();
            var cix = 0;
            for (let z = 0; z < this._mcount.z; z++) {
                for (let y = 0; y < this._mcount.y; y++) {
                    for (let x = 0; x < this._mcount.x; x++) {
                        var xyz = x + this._mcount.x * y + this._mcount.x * this._mcount.y * z;
                        cix = xyz % this._mesh.length;
                        let xo = -this._size.x * (this._mcount.x - 1) / 2;
                        let yo = -this._size.y * (this._mcount.y - 1) / 2;
                        let zo = -this._size.z * (this._mcount.z - 1) / 2;
                        this._clones[xyz].position.x = xo + x * this._size.x;
                        this._clones[xyz].position.y = yo + y * this._size.y;
                        this._clones[xyz].position.z = zo + z * this._size.z;
                        this._clones[xyz].getChildren()[0].position = this.ePosition(Cloner.vZero);
                    }
                }
            }
        }
        get root() {
            return this._rootNode;
        }
        delete() {
            for (let i = this._count - 1; i >= 0; i--) {
                this._clones[i].delete();
            }
            this._clones.length = 0;
            //this._rootNode.dispose();
        }
        update() {
            if (this._count > 0) {
                this.calcRot();
                this.calcPos();
                this.calcSize();
            }
        }
    }
    BABYLONX.MatrixCloner = MatrixCloner;
    class LinearCloner2 extends Cloner {
        constructor(mesh, scene, { count = 3, offset = 0, growth = 1, useInstances = true, P = { x: 0, y: 2, z: 0 }, S = { x: 1, y: 1, z: 1 }, R = { x: 0, y: 0, z: 0 }, iModeRelative = false } = {}) {
            super();
            LinearCloner.instance_nr = 0 | (LinearCloner.instance_nr + 1);
            this._mesh = mesh;
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            });
            this._scene = scene,
                this._useInstances = useInstances;
            this._clones = [];
            this._count = Number(count);
            this._offset = offset;
            this._P = new BABYLON.Vector3(P.x, P.y, P.z);
            this._S = new BABYLON.Vector3(S.x, S.y, S.z);
            this._R = new BABYLON.Vector3(R.x, R.y, R.z);
            this._iModeRelative = iModeRelative;
            this._growth = growth;
            this._instance_nr = LinearCloner.instance_nr;
            this._rootNode = new CMesh(`rootLC_${LinearCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();
        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new LinearCloner(this._mesh, this._scene, { count: this._count, offset: this._offset, growth: this._growth, useInstances: this._useInstances, P: { x: this._P.x, y: this._P.y, z: this._P.z }, S: { x: this._S.x, y: this._S.y, z: this._S.z }, R: { x: this._R.x, y: this._R.y, z: this._R.z }, iModeRelative: this._iModeRelative });
            parent._cloner = c;
            c.root.parent = parent;
            return c.root;
        }
        createClones(start = 0) {
            var cix = 0;
            for (let i = start; i < this._count; i++) {
                var n = new CMesh(`n_lc${LinearCloner.instance_nr}_${i}`, this._scene, i == 0 ? this._rootNode : this._clones[i - 1]);
                this._clones.push(n);
                cix = i % this._mesh.length;
                n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_lc${LinearCloner.instance_nr}_${i}`);
            }
        }
        calcSize() {
            for (let i = 1; i < this._count; i++) {
                var orig = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, this._iModeRelative ? i : i / (this._count - 1));
                this._clones[i].getChildren()[0].scaling = this.eScale(orig);
            }
        }
        calcPos() {
            this.eReset();
            let f = this._growth;
            if (this._iModeRelative == false) {
                var tcm1 = this._count == 1 ? 1 : this._count - 1;
                f = 1 / (tcm1) * this._growth;
            }
            //shift offset
            this._clones[0].position = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f * this._offset);
            this._clones[0].position = this.ePosition(this._clones[0].position);
            for (let i = 1; i < this._count; i++) {
                this._clones[i].position = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f);
                this._clones[i].getChildren()[0].position = this.ePosition(Cloner.vZero);
            }
        }
        calcRot() {
            for (let i = 1; i < this._count; i++) {
                let item = this._clones[i].getChildren()[0];
                //this._clones[i].getChildren()[0].rotation = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeRelative ? i * this._growth : i / (this._count - 1) * this._growth);
                //this._clones[i].getChildren()[0].rotation = this.eRotate(Cloner.vZero);//   this._clones[i].rotation);
                let vRot = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeRelative ? i * this._growth : i / (this._count - 1) * this._growth);
                this._clones[i].getChildren()[0].rotation = this.eRotate(vRot); //   this._clones[i].rotation);
            }
        }
        update() {
            if (this._count > 0) {
                this.calcRot();
                this.calcPos();
                this.calcSize();
            }
        }
        recalc() {
            var cnt = this._count;
            this.count = 0;
            this.count = cnt;
        }
        set growth(g) {
            this._growth = g;
            this.update();
        }
        delete() {
            for (let i = this._count - 1; i >= 0; i--) {
                this._clones[i].parent = null;
                this._clones[i].getChildren()[0].dispose();
                this._clones[i].dispose();
            }
            this._rootNode.dispose();
        }
        set count(scnt) {
            let cnt = Number(scnt);
            if (cnt < Number(this._count)) {
                for (let i = this._count - 1; i >= cnt; i--) {
                    this._clones[i].delete();
                }
                this._count = cnt;
                this._clones.length = cnt;
            }
            else if (cnt > Number(this._count)) {
                var start = this._count;
                this._count = cnt;
                this.createClones(start);
            }
            this.update();
        }
        get count() {
            return this._count;
        }
        set mode(m) {
            let newMode = (m == "step") ? true : false;
            let f = (this._count - 1);
            if (newMode && this._iModeRelative == false) {
                f = 1 / f;
            }
            this._R = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, f);
            this._P = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f);
            this._S = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, f);
            this._iModeRelative = newMode;
            this.update();
        }
        set position(pos) {
            this._P.x = pos.x;
            this._P.y = pos.y;
            this._P.z = pos.z;
            this.update();
        }
        get position() {
            return { x: this._P.x, y: this._P.y, z: this._P.z };
        }
        set scale(s) {
            this._S.x = s.x;
            this._S.y = s.y;
            this._S.z = s.z;
            this.update();
        }
        get scale() {
            return { x: this._S.x, y: this._S.y, z: this._S.z };
        }
        set rotation(r) {
            this._R.x = r.x * Math.PI / 180;
            this._R.y = r.y * Math.PI / 180;
            this._R.z = r.z * Math.PI / 180;
            this.update();
        }
        get rotation() {
            return { x: this._R.x * 180 / Math.PI, y: this._R.y * 180 / Math.PI, z: this._R.z * 180 / Math.PI };
        }
        set offset(o) {
            this._offset = o;
            this.update();
        }
        get offset() {
            return this._offset;
        }
        get root() {
            return this._rootNode;
        }
        get mesh() {
            return this._mesh;
        }
    }
    BABYLONX.LinearCloner2 = LinearCloner2;
    class LinearCloner extends Cloner {
        constructor(mesh, scene, { count = null, offset = 0, growth = 1, useInstances = true, P = { x: 0, y: 2, z: 0 }, S = { x: 1, y: 1, z: 1 }, R = { x: 0, y: 0, z: 0 }, iModeRelative = false } = {}) {
            super();
            this._countNumberGen = null;
            LinearCloner.instance_nr = 0 | (LinearCloner.instance_nr + 1);
            this._mesh = mesh;
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            });
            this._scene = scene,
                this._useInstances = useInstances;
            this._clones = [];
            this._countNumberGen = count instanceof RandomNumberGen ? count : null;
            this._count = count instanceof RandomNumberGen ? count.nextInt() : Number(count);
            this._offset = offset;
            this._P = new BABYLON.Vector3(P.x, P.y, P.z);
            this._S = new BABYLON.Vector3(S.x, S.y, S.z);
            this._R = new BABYLON.Vector3(R.x * Math.PI / 180, R.y * Math.PI / 180, R.z * Math.PI / 180);
            this._iModeRelative = iModeRelative;
            this._growth = growth;
            this._instance_nr = LinearCloner.instance_nr;
            this._rootNode = new CMesh(`rootLC_${LinearCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();
        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            let cnt = this._countNumberGen != null ? this._countNumberGen.nextInt() : this._count;
            var c = new LinearCloner(this._mesh, this._scene, { count: cnt, offset: this._offset, growth: this._growth, useInstances: this._useInstances, P: { x: this._P.x, y: this._P.y, z: this._P.z }, S: { x: this._S.x, y: this._S.y, z: this._S.z }, R: { x: this._R.x, y: this._R.y, z: this._R.z }, iModeRelative: this._iModeRelative });
            parent._cloner = c;
            c.root.parent = parent;
            return c.root;
        }
        createClones(start = 0) {
            for (let i = start; i < this._count; i++) {
                //create Node for each clone, RADIAL=>parent = rootnode 
                var n = new CMesh(`n_lc${this._instance_nr}_${i}`, this._scene, this._rootNode);
                //n.index = i;
                this._clones.push(n);
                //create clone
                let cix = i % this._mesh.length;
                let c = n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_lc${this._instance_nr}_${i}`);
            }
        }
        createClones2(start = 0) {
            var cix = 0;
            for (let i = start; i < this._count; i++) {
                var n = new CMesh(`n_lc${LinearCloner.instance_nr}_${i}`, this._scene, i == 0 ? this._rootNode : this._clones[i - 1]);
                this._clones.push(n);
                cix = i % this._mesh.length;
                n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_lc${LinearCloner.instance_nr}_${i}`);
            }
        }
        calcSize() {
            for (let i = 1; i < this._count; i++) {
                var orig = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, this._iModeRelative ? i : i / (this._count - 1));
                this._clones[i].getChildren()[0].scaling = this.eScale(orig);
            }
        }
        calcPos() {
            this.eReset();
            let f = this._growth;
            if (this._iModeRelative == false) {
                var tcm1 = this._count == 1 ? 1 : this._count - 1;
                f = 1 / (tcm1) * this._growth;
            }
            for (let i = 0; i < this._count; i++) {
                let off = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f * this._offset);
                let v = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, i * f);
                let v2 = v.add(off);
                this._clones[i].position = this.ePosition(v2);
            }
        }
        calcPos2() {
            this.eReset();
            let f = this._growth;
            if (this._iModeRelative == false) {
                var tcm1 = this._count == 1 ? 1 : this._count - 1;
                f = 1 / (tcm1) * this._growth;
            }
            //shift offset
            this._clones[0].position = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f * this._offset);
            this._clones[0].position = this.ePosition(this._clones[0].position);
            for (let i = 1; i < this._count; i++) {
                let v = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f);
                this._clones[i].position = v;
                this._clones[i].getChildren()[0].position = this.ePosition(Cloner.vZero);
            }
        }
        calcRot() {
            for (let i = 1; i < this._count; i++) {
                let item = this._clones[i].getChildren()[0];
                //this._clones[i].getChildren()[0].rotation = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeRelative ? i * this._growth : i / (this._count - 1) * this._growth);
                //this._clones[i].getChildren()[0].rotation = this.eRotate(Cloner.vZero);//   this._clones[i].rotation);
                let vRot = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeRelative ? i * this._growth : i / (this._count - 1) * this._growth);
                this._clones[i].getChildren()[0].rotation = this.eRotate(vRot); //   this._clones[i].rotation);
            }
        }
        calcColor() {
            /*
            if (this._effectors.length > 0) {
                let e = this._effectors[0];
                for (let i = 1; i < this._count; i++) {
                    let cr = e.effector.getRandomColor();
                    let cg = e.effector.getRandomColor();
                    let cb = e.effector.getRandomColor();
                    this._clones[i].getChildren()[0].material.diffuseColor.r = cr;
                    this._clones[i].getChildren()[0].material.diffuseColor.g = cg;
                    this._clones[i].getChildren()[0].material.diffuseColor.b = cb;
                }
            }
            */
        }
        update() {
            if (this._count > 0) {
                this.calcRot();
                this.calcPos();
                this.calcSize();
                this.calcColor();
            }
        }
        recalc() {
            var cnt = this._count;
            this.count = 0;
            this.count = cnt;
        }
        get growth() {
            return this._growth;
        }
        set growth(g) {
            this._growth = g;
            this.update();
        }
        delete() {
            for (let i = this._count - 1; i >= 0; i--) {
                this._clones[i].parent = null;
                this._clones[i].getChildren()[0].dispose();
                this._clones[i].dispose();
            }
            this._rootNode.dispose();
        }
        set count(scnt) {
            let cnt = Number(scnt);
            if (cnt < Number(this._count)) {
                for (let i = this._count - 1; i >= cnt; i--) {
                    this._clones[i].delete();
                }
                this._count = cnt;
                this._clones.length = cnt;
            }
            else if (cnt > Number(this._count)) {
                var start = this._count;
                this._count = cnt;
                this.createClones(start);
            }
            this.update();
        }
        get count() {
            return this._count;
        }
        /**
        * Does some thing in old style.
        *
        * @deprecated use iModeRel instead.
        */
        set mode(m) {
            this.iModeRel = (m == "step");
        }
        set iModeRel(mode) {
            let newMode = mode;
            let f = (this._count - 1);
            if (newMode && this._iModeRelative == false) {
                f = 1 / f;
            }
            this._R = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, f);
            this._P = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f);
            this._S = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, f);
            this._iModeRelative = newMode;
            this.update();
        }
        set position(pos) {
            this._P.x = pos.x;
            this._P.y = pos.y;
            this._P.z = pos.z;
            this.update();
        }
        get position() {
            return { x: this._P.x, y: this._P.y, z: this._P.z };
        }
        set scale(s) {
            this._S.x = s.x;
            this._S.y = s.y;
            this._S.z = s.z;
            this.update();
        }
        get scale() {
            return { x: this._S.x, y: this._S.y, z: this._S.z };
        }
        set rotation(r) {
            this._R.x = r.x * Math.PI / 180;
            this._R.y = r.y * Math.PI / 180;
            this._R.z = r.z * Math.PI / 180;
            this.update();
        }
        get rotation() {
            return { x: this._R.x * 180 / Math.PI, y: this._R.y * 180 / Math.PI, z: this._R.z * 180 / Math.PI };
        }
        get rotation3() {
            return new BABYLON.Vector3(this._R.x, this._R.y, this._R.z);
        }
        set rotation3(vec) {
            this._R.x = vec.x;
            this._R.y = vec.y;
            this._R.z = vec.z;
            this.update();
        }
        set offset(o) {
            this._offset = o;
            this.update();
        }
        get offset() {
            return this._offset;
        }
        get root() {
            return this._rootNode;
        }
        get mesh() {
            return this._mesh;
        }
    }
    BABYLONX.LinearCloner = LinearCloner;
})(BABYLONX || (BABYLONX = {}));
