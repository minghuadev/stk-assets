//  SuperTuxKart - a fun racing game with go-kart
//  Copyright (C) 2013 the SuperTuxKart team
//
//  This program is free software; you can redistribute it and/or
//  modify it under the terms of the GNU General Public License
//  as published by the Free Software Foundation; either version 3
//  of the License, or (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.

#version 130
uniform mat4 ModelViewProjectionMatrix;
uniform mat4 TransposeInverseModelView;
uniform vec3 lightdir;

noperspective out vec3 normal;
out vec4 vertex_color;
noperspective out vec3 eyeVec;
noperspective out vec3 lightVec;

void main()
{
    gl_Position = ModelViewProjectionMatrix * gl_Vertex;
    vertex_color = gl_Color;

    //vec3 normal3 = normalize(gl_Normal);
    //vec4 normal4 = vec4(normal3.x, normal3.y, normal3.z, 0.0)*gl_ModelViewMatrix;
    //normal = normal4.xyz;

    eyeVec = normalize(-gl_Position).xyz; // we are in Eye Coordinates, so EyePos is (0,0,0)
    normal = normalize((TransposeInverseModelView * vec4(gl_Normal, 1.)).xyz);

    // Building the matrix Eye Space -> Tangent Space
    // gl_MultiTexCoord1.xyz
	vec3 t = normalize ((TransposeInverseModelView * vec4(0.0, 0.0, 1.0, 1.)).xyz); // tangent
	vec3 b = cross (normal, t);

	// transform light and half angle vectors by tangent basis
	vec3 v;
	v.x = dot(lightdir, t);
	v.y = dot(lightdir, b);
	v.z = dot(lightdir, normal);
	lightVec = normalize (v);
}
