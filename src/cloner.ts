


///<reference path="../lib/babylon.marbleProceduralTexture.d.ts" />
module BABYLONX {
    export class Demomeshes {
        static objInstances: number;
        private _scene;
        constructor(scene) {
            Demomeshes.objInstances = 0 | (Demomeshes.objInstances + 1);
            this._scene=scene;
        }
       createCube(size = { w: 1, h: 1, d: 1 },  color = "#FF0000") {
            var options = { width: size.w, depth: size.d, height: size.h };
            var cube = BABYLON.MeshBuilder.CreateBox("cube"+ Demomeshes.objInstances, options, this._scene);
            var mat = new BABYLON.StandardMaterial("mcube" + Demomeshes.objInstances, this._scene);
            mat.diffuseColor =  BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            //mat.wireframe=true;
            cube.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble"+ Demomeshes.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = .5;
            marbleTexture.numberOfTilesWidth = .5;
            marbleTexture.jointColor = new BABYLON.Color3(0, 0, 1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.0;
            mat.diffuseTexture = marbleTexture;
            //mat.alpha=.3;
            //mat.diffuseTexture.hasAlpha=true;  
            Demomeshes.objInstances++;
            return cube;
       }
        createCylinder(height = 1, color = "#00ff00",top=0.5,bottom=0.5) {
            var mat = new BABYLON.StandardMaterial("cmat" + Demomeshes.objInstances, this._scene);
            var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demomeshes.objInstances, { height: height, diameterTop:top,diameterBottom: bottom, tessellation: 32 }, this._scene);
            //var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demomeshes.objInstances, { height: height, tessellation: 32 }, this._scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            cone.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble"+ Demomeshes.objInstances, 512, this._scene);
            marbleTexture.numberOfTilesHeight = 1.0;
            marbleTexture.numberOfTilesWidth = .5;
            //marbleTexture.jointColor=new BABYLON.Color3(0,0,1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.2;
            mat.diffuseTexture = marbleTexture;
            Demomeshes.objInstances++;
            //cone.rotation.x=Math.PI/4;
            return cone;
        }
        createIcoSphere(radius=6) {
            var mesh = BABYLON.MeshBuilder.CreateIcoSphere("m", {radius: radius}, this._scene);
            mesh.updateFacetData();
            return mesh;
        }
        createSphere(diameter= 1, color = "#0000ff",segments=32) {
            var mat = new BABYLON.StandardMaterial("stdmat" + Demomeshes.objInstances, this._scene);
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere" + Demomeshes.objInstances, { diameter: diameter,segments:segments }, this._scene);
            //mat.diffuseTexture= new BABYLON.Texture("testtexture.png",this.scene);
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, this._scene);
            marbleTexture.numberOfTilesHeight = 1.0;
            marbleTexture.numberOfTilesWidth = .5;
            //marbleTexture.jointColor=new BABYLON.Color3(0,0,1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.2;
            mat.diffuseTexture = marbleTexture;
            mat.diffuseColor = BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            sphere.material = mat;
            Demomeshes.objInstances++;
            return sphere;

        }
    }
    export class Demoscene {
        static objInstances: number;
        private _engine;
        private _scene;
        private _canvas;
        private _camera;
        private _light;
        constructor() {
            Demoscene.objInstances = 0 | (Demoscene.objInstances + 1);
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
            this._camera.wheelPrecision = 8;
            this._camera.radius = 25;
            this._camera.alpha = 1.66;
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
        createCubeInternal(cube, color) {
            var mat = new BABYLON.StandardMaterial("mcube" + Demoscene.objInstances, this._scene);

            mat.diffuseColor = color;// BABYLON.Color3.FromHexString(color);
            mat.specularColor = BABYLON.Color3.Green();
            //mat.wireframe=true;
            cube.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, this.scene);
            marbleTexture.numberOfTilesHeight = .5;
            marbleTexture.numberOfTilesWidth = .5;
            marbleTexture.jointColor = new BABYLON.Color3(0, 0, 1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.0;
            mat.diffuseTexture = marbleTexture;
            //mat.alpha=.3;
            //mat.diffuseTexture.hasAlpha=true;  
            Demoscene.objInstances++;
            return cube;
        }
        createCubeX(scene ,size = { w: 1, h: 1, d: 1 },  color = "#FF0000") {
            var options = { width: size.w, depth: size.d, height: size.h };
            var cube = BABYLON.MeshBuilder.CreateBox("cube", options, scene);
            return this.createCubeInternal(cube, BABYLON.Color3.FromHexString(color));
        }
        createCube(size = 1, color = BABYLON.Color3.Red()) {
            var cube = BABYLON.Mesh.CreateBox("cube" + Demoscene.objInstances, size, this._scene);
            return this.createCubeInternal(cube, color);
        }
        createCone(height = 1, color = BABYLON.Color3.Green()) {
            var mat = new BABYLON.StandardMaterial("cmat" + Demoscene.objInstances, this._scene);
            var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demoscene.objInstances, { height: 1, diameterTop: 0, tessellation: 32 }, this._scene);
            mat.diffuseColor = color;
            mat.specularColor = BABYLON.Color3.Green();
            cone.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, this.scene);
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
        createCylinder(height = 1, color = BABYLON.Color3.Green()) {
            var mat = new BABYLON.StandardMaterial("cmat" + Demoscene.objInstances, this._scene);
            //var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demoscene.objInstances, { height: height, diameterTop: height/2,diameterBottom: height/2, tessellation: 32 }, this._scene);
            var cone = BABYLON.MeshBuilder.CreateCylinder("cone" + Demoscene.objInstances, { height: height, tessellation: 32 }, this._scene);
            mat.diffuseColor = color;
            mat.specularColor = BABYLON.Color3.Green();
            cone.material = mat;
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, this.scene);
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
        createIcoSphere(scene, radius=6) {
            var mesh = BABYLON.MeshBuilder.CreateIcoSphere("m", {radius: radius}, scene);
            mesh.updateFacetData();
            return mesh;
        }
        createSphere(diameter= 1, color = BABYLON.Color3.Blue(),segments=32) {
            var mat = new BABYLON.StandardMaterial("stdmat" + Demoscene.objInstances, this._scene);
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere" + Demoscene.objInstances, { diameter: diameter,segments:segments }, this._scene);
            //mat.diffuseTexture= new BABYLON.Texture("testtexture.png",this.scene);
            var marbleTexture = new BABYLON.MarbleProceduralTexture("marble", 512, this._scene);
            marbleTexture.numberOfTilesHeight = 1.0;
            marbleTexture.numberOfTilesWidth = .5;
            //marbleTexture.jointColor=new BABYLON.Color3(0,0,1);
            //marbleTexture.marbleColor=new BABYLON.Color3(1,0,0);
            marbleTexture.amplitude = 9.2;
            mat.diffuseTexture = marbleTexture;
            mat.diffuseColor = color;
            mat.specularColor = BABYLON.Color3.Green();
            sphere.material = mat;
            Demoscene.objInstances++;
            return sphere;

        }

        renderloop() {
            this._scene.render();
        }
        get scene() {
            return this._scene;
        }
    }

    export class CMesh extends BABYLON.Mesh {
        private _cloner = null;
        constructor(name, scene, parent, cloner = null) {
            super(name, scene, parent);
            this._cloner = cloner;
            //this.parent=parent;
        }
        delete() {
            if (this._cloner != null) {
                this._cloner.delete();
            } else {
                this.getChildren()[0].dispose();
            }
            this.parent = null;
            this.dispose();

        }
        createClone(item, useInstances, name) {
            var c;
            if (item instanceof Cloner) {
                c = item.createClone(this);
            } else {
                if (useInstances) {
                    c = item.createInstance(name + "_i");
                    c.parent = this;
                } else {
                    c = item.clone(name + "_c");
                    c.parent = this;
                }
            }



            return c;
        }
    }
    enum EFFECTOR_STRENGTHXX {
        ALL = 7,
        POSITION = 1,
        ROTATION = 2,
        SCALE = 4
    }
    export class RandomEffector {
        private _seed: number;
        private _s: number;
        private _rfunction;
        private _strength: number = 0.0;
        private _position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
        private _rotation: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
        private _scale: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
        private _uniformScale = false;
        private _clients = [];
        constructor(seed = 42) {
            this._seed = this._s = seed;
            this._rfunction = function () {
                this._s = Math.sin(this._s) * 10000; return this._s - Math.floor(this._s);
            };
        }
        random(): number {
            return this._rfunction();
        }
        reset(): void {
            this._s = this._seed;
        }
        updateRotation(vec: BABYLON.Vector3) {
            var m1 = this._rotation.multiplyByFloats((-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength);
            return vec.add(m1);
        }
        updatePosition(vec: BABYLON.Vector3) {
            var m1 = this._position.multiplyByFloats((-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength, (-.5 + this.random()) * this._strength);
            return vec.add(m1);
        }
        updateScale(vec: BABYLON.Vector3) {
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
            this._clients.forEach(function (c) { c.update() })
        }
        get strength():number {
            return this._strength;
        }
        set strength(s:number) {
            this._strength = s;

        }
        set position(p:{x,y,z}) {
            this._position.x = p.x;
            this._position.y = p.y;
            this._position.z = p.z;
        }
        set scale(s:{x,y,z,u}) {
            this._uniformScale = s.u;
            this._scale.x = this._scale.y = this._scale.z = s.x;
            if (s.u == false) {
                this._scale.y = s.y;
                this._scale.z = s.z;
            }

        }
        set rotation(s:{x,y,z}) {
            this._rotation.x = s.x * Math.PI / 180;
            this._rotation.y = s.y * Math.PI / 180;
            this._rotation.z = s.z * Math.PI / 180;
        }
        set seed(s:number) {
            this._seed = this._s = s;
        }

    }
    export class Cloner {
        static vOne = new BABYLON.Vector3(1, 1, 1);
        static vZero = new BABYLON.Vector3(0, 0, 0);
        _rootNode = null;
        _mesh;
        _scene;
        _clones;
        _count: number;
        _effectors = [];
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
        eScale(vec: BABYLON.Vector3): BABYLON.Vector3 {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updateScale(vRet), this._effectors[i].sensitivity);
            }
            return vRet;
        }
        eRotate(vec: BABYLON.Vector3): BABYLON.Vector3 {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updateRotation(vRet), this._effectors[i].sensitivity);
            }
            return vRet;
        }
        ePosition(vec): BABYLON.Vector3 {
            var vRet = Cloner.vZero.add(vec);
            for (let i = 0; i < this._effectors.length; i++) {
                vRet = BABYLON.Vector3.Lerp(vec, this._effectors[i].effector.updatePosition(vRet), this._effectors[i].sensitivity);
            }
            return vRet;// BABYLON.Vector3.Lerp(vec,vRet,this._effectorStrength.x);
        }
        eReset() {
            this._effectors.forEach(function (e) { e.effector.reset() });
        }

    }
    export class RadialCloner extends Cloner {
        static instance_nr;
        private _instance_nr;
        private _useInstances: boolean;
        private _radius: number;
        private _plane: BABYLON.Vector3;
        private _startangle: number;
        private _endangle: number;
        private _offset: number;
        private _align: boolean;
        private _frame: number;
        private _formula: string;



        constructor(mesh, scene, { count = 3, offset = 0, radius = 3, align = true, startangle = 0, endangle = 360, useInstances = true, plane = { x: 1, y: 0, z: 1 } } = {}) {
            super();
            RadialCloner.instance_nr = 0 | (RadialCloner.instance_nr + 1);
            this._instance_nr = RadialCloner.instance_nr;
            this._mesh = mesh;
            this._mesh.forEach(function (m) { m.setEnabled(false); })
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
            this._formula = "2-Math.pow(Math.abs(Math.sin(frame/10+Math.PI*i/2)),0.1)*1.5"
            this._formula = "scaling=1-Math.sin(frame/6+2*ix*Math.PI)/2"


            //this._rootNode=new CMesh("root",this._scene,this);
            this._rootNode = new CMesh(`rootRC_${this._instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();

        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new RadialCloner(this._mesh, this._scene, { count: this._count, offset: this._offset, radius: this._radius, startangle: this._startangle * 180 / Math.PI, endangle: this._endangle * 180 / Math.PI, useInstances: this._useInstances, plane: { x: this._plane.x, y: this._plane.y, z: this._plane.z } })
            parent._cloner = c;
            c.root.parent = parent;
            return c.root;
        }

        createClones(start = 0) {
            for (let i = start; i < this._count; i++) {
                //create Node for each clone, RADIAL=>parent = rootnode 
                var n = new CMesh(`n_rc${this._instance_nr}_${i}`, this._scene, this._rootNode);
                //n.index = i;
                this._clones.push(n);
                //create clone
                let cix = i % this._mesh.length;
                n.createClone(this._mesh[cix], this._useInstances, `${this._mesh[cix].name}_rc${this._instance_nr}_${i}`);
            }
        }
        calcRot() {
            for (let i = 0; i < this._count; i++) {
                let arange = this._endangle - this._startangle;
                let step = arange / this._count;
                this._clones[i].getChildren()[0].rotation.x = this._clones[i].getChildren()[0].rotation.y = this._clones[i].getChildren()[0].rotation.z = 0;
                if (this._plane.y === 0) {
                    this._clones[i].getChildren()[0].rotation.y = this._align ? this._offset + this._startangle + i * step : 0;
                } else if (this._plane.x === 0) {
                    this._clones[i].getChildren()[0].rotation.x = this._align ? -this._offset - this._startangle - i * step : 0;
                } else {
                    this._clones[i].getChildren()[0].rotation.z = this._align ? -this._offset - this._startangle - i * step : 0;
                }

                let vRet = this.eRotate(this._clones[i].getChildren()[0].rotation);
                this._clones[i].getChildren()[0].rotation = vRet;
            }

        }
        calcSize() {
            for (let i = 0; i < this._count; i++) {
                //var orig=BABYLON.Vector3.Lerp(Cloner.vOne, this._S, this._iModeStep ? i : i / (this._count - 1));
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
                    //this._clones[i].getChildren()[0].rotation.y = this._align ? this._offset + this._startangle + i * step : 0;
                    //this._clones[i].scaling=RadialCloner.vOne.multiplyByFloats(1,(0.5+(this.frame%this._count))/this._count,1);
                } else if (this._plane.x === 0) {
                    this._clones[i].position.y = Math.sin(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position.z = Math.cos(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position = this.ePosition(this._clones[i].position);
                    //this._clones[i].getChildren()[0].rotation.x = this._align ? -this._offset - this._startangle - i * step : 0;
                } else {
                    this._clones[i].position.x = Math.sin(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position.y = Math.cos(this._offset + this._startangle + i * step) * this._radius;
                    this._clones[i].position = this.ePosition(this._clones[i].position);
                    //this._clones[i].getChildren()[0].rotation.z = this._align ? -this._offset - this._startangle - i * step : 0;
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
            } else if (cnt > Number(this._count)) {
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
            this.update()
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
    export class ObjectCloner extends Cloner {
        static instance_nr;
        private _useInstances: boolean=true;
        private _template;
        private _instance_nr;
        private _positions;
        private _normals;
        constructor(mesh,template:BABYLON.Mesh,scene){
            super();
            ObjectCloner.instance_nr = 0 | (ObjectCloner.instance_nr + 1);
            this._mesh = mesh;
            this._scene=scene;
            this._template=template;
            this._clones = [];
            this._positions=template.getFacetLocalPositions();
            this._normals=template.getFacetLocalNormals();
            this._template.isVisible=false;//  setEnabled(false);
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            })
            this._instance_nr = ObjectCloner.instance_nr;
            this._rootNode = new CMesh(`rootOC_${ObjectCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.calcPos();
        }
        createClones(start = 0) {
            var cix = 0;
            this._count=this._positions.length;
            for(let i=0;i<this._positions.length;i++) {
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
            for(let i=0;i<this._clones.length;i++) {
                this._clones[i].position=this.ePosition(this._positions[i]);
                /*
                this._clones[i].position.x=this._positions[i].x;
                this._clones[i].position.y=this._positions[i].y;
                this._clones[i].position.z=this._positions[i].z;
                */
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
    export class MatrixCloner extends Cloner {
        static instance_nr;
        private _useInstances: boolean;
        private _size;
        private _mcount;
        private _iModeStep;
        private _instance_nr;

        constructor(mesh, scene, { useInstances = true, mcount = { x: 3, y: 3, z: 3 }, size = { x: 2, y: 2, z: 2 }, iModeStep = false } = {}) {
            super();
            MatrixCloner.instance_nr = 0 | (MatrixCloner.instance_nr + 1);
            this._mesh = mesh;
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            })
            this._scene = scene,
                this._useInstances = useInstances;
            this._clones = [];
            this._size = size;
            this._mcount = mcount;
            this._count = Number(mcount.x * mcount.y * mcount.z);
            this._iModeStep = iModeStep;
            this._instance_nr = MatrixCloner.instance_nr;
            this._rootNode = new CMesh(`rootMC_${MatrixCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();
        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new MatrixCloner(this._mesh, this._scene, { mcount: this._mcount, size:this._size })
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
        set size(s) {
            this._size = s;
            this.update();
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
    export class LinearCloner extends Cloner {
        static instance_nr;
        private _useInstances: boolean;
        private _offset: number;
        private _P: BABYLON.Vector3;
        private _R: BABYLON.Vector3;
        private _S: BABYLON.Vector3;
        private _iModeStep;
        private _growth;
        private _instance_nr;


        constructor(mesh, scene, { count = 3, offset = 0, growth = 1, useInstances = true, P = { x: 0, y: 2, z: 0 }, S = { x: 1, y: 1, z: 1 }, R = { x: 0, y: 0, z: 0 }, iModeStep = false } = {}) {
            super();
            LinearCloner.instance_nr = 0 | (LinearCloner.instance_nr + 1);
            this._mesh = mesh;
            this._mesh.forEach(function (m) {
                m.setEnabled(false);
            })
            this._scene = scene,
                this._useInstances = useInstances;
            this._clones = [];
            this._count = Number(count);
            this._offset = offset;
            this._P = new BABYLON.Vector3(P.x, P.y, P.z);
            this._S = new BABYLON.Vector3(S.x, S.y, S.z);
            this._R = new BABYLON.Vector3(R.x, R.y, R.z);
            this._iModeStep = iModeStep;
            this._growth = growth;
            this._instance_nr = LinearCloner.instance_nr;
            this._rootNode = new CMesh(`rootLC_${LinearCloner.instance_nr}`, this._scene, null, this);
            this.createClones();
            this.update();

        }
        createClone(parent, dummyUseInstances = null, dummyName = null) {
            var c = new LinearCloner(this._mesh, this._scene, { count: this._count, offset: this._offset, growth: this._growth, useInstances: this._useInstances, P: { x: this._P.x, y: this._P.y, z: this._P.z }, S: { x: this._S.x, y: this._S.y, z: this._S.z }, R: { x: this._R.x, y: this._R.y, z: this._R.z }, iModeStep: this._iModeStep })
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
                var orig = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, this._iModeStep ? i : i / (this._count - 1));
                this._clones[i].getChildren()[0].scaling = this.eScale(orig);
            }
        }
        calcPos() {
            this.eReset();
            let f = this._growth;
            if (this._iModeStep == false) {
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
                //this._clones[i].getChildren()[0].rotation = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeStep ? i * this._growth : i / (this._count - 1) * this._growth);
                //this._clones[i].getChildren()[0].rotation = this.eRotate(Cloner.vZero);//   this._clones[i].rotation);
                let vRot = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, this._iModeStep ? i * this._growth : i / (this._count - 1) * this._growth);
                this._clones[i].getChildren()[0].rotation = this.eRotate(vRot);//   this._clones[i].rotation);
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
            } else if (cnt > Number(this._count)) {
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
            if (newMode && this._iModeStep == false) {
                f = 1 / f;
            }
            this._R = BABYLON.Vector3.Lerp(Cloner.vZero, this._R, f);
            this._P = BABYLON.Vector3.Lerp(Cloner.vZero, this._P, f);
            this._S = BABYLON.Vector3.Lerp(Cloner.vOne, this._S, f);

            this._iModeStep = newMode;
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

} 