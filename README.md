# clonerjs
BABYLON Cloners
 
<p>
	Extension for <a href="http://www.babylonjs.com/"> BabylonJS framework </a>
</p>
Definitions:
<ul><li>
		Cloners: given one or several meshes, either clones or instances will distributed in a specific manner. If more than one mesh is provided, the meshes are distributed alternatively. Additionally, cloners can be nested, so it is possible to clone cloners. Each cloner can have several Effectors (in particular order) to influence the Scale/Position/Rotation parameter of a clone (or cloner). A sensitivity parameter controls this influence for a cloner. Following Objects are designated:
	</li>
	<li>
		RadialCloner: radial distribution where following parameters are recognized: count, radius, offset, startangle, endangle, Effector-sensitivity for Position, Scale and Rotation, alignment-flag, orientation.
	</li>
	<li>
		LinearCloner: linear distribution where following parameters are recognized:count, offset, growth, Effector-sensitivity for Position, Scale and Rotation. An interpolation-mode-flag&nbsp; determines, if the clone -parameters (Scale/Position/Rotation) are interpreted as "step" or "end"-values.
	</li>
	<li>
		MatrixCloner: coming soon (clones will be distributed in&nbsp; 3D space)
	</li>
	<li>
		PlanarCloner: coming soon (clones will be distributed in 2D space)
	</li>
	<li>
		ObjectCloner: coming soon (clones will be distributed in relation to the internals of a given mesh (vertices, edges, triangles ...)
	</li>
	<li>
		RandomEffector: influences Scale/Position/Rotation of a clone with repeatable random values, controlled with an overall "strength" parameter. Not quite finished, but basically working.
	</li>
	<li>
		FormulaEffector: coming soon, influences Scale/Position/Rotation via text thought to control from outside (html-page).
	</li>
	<li>
		StepEffector, TimeEffector, DelayEffector and much more ???
	</li>
</ul><p> 