#version 130
uniform sampler2D tex;
uniform int hastex;
uniform float objectid;

noperspective in vec3 nor;
noperspective in vec3 eyenor;
noperspective in vec3 viewpos;

void main() {
	float rim = 1.0 - dot(eyenor, viewpos);
	rim = smoothstep(0.5, 1.5, rim) * 0.35;
	vec4 color;

	if (hastex != 0) {
		vec4 col = texture2D(tex, gl_TexCoord[0].xy);

		if (col.a < 0.1)
			discard;

		col.xyz += rim;

		color = col;
	} else {
		color = gl_Color + vec4(vec3(rim), 0.0);
	}

	gl_FragData[0] = vec4(color.xyz, 1.);
	gl_FragData[1] = vec4(0.5 * normalize(nor) + 0.5, gl_FragCoord.z);
	gl_FragData[2] = vec4(1. - color.a);
}

