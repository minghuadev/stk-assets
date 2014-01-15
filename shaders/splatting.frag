#version 130
uniform sampler2D tex_layout;
uniform sampler2D tex_detail0;
uniform sampler2D tex_detail1;
uniform sampler2D tex_detail2;
uniform sampler2D tex_detail3;
//uniform sampler2D tex_detail4;

noperspective in vec3 nor;
in vec2 uv;
in vec2 uv_bis;

void main() {
	// Splatting part
	vec4 splatting = texture2D(tex_layout, uv_bis);
	vec4 detail0 = texture2D(tex_detail0, uv);
	vec4 detail1 = texture2D(tex_detail1, uv);
	vec4 detail2 = texture2D(tex_detail2, uv);
	vec4 detail3 = texture2D(tex_detail3, uv);
//	vec4 detail4 = texture2D(tex_detail4, uv);
	vec4 detail4 = vec4(0.0);

	vec4 splatted = (splatting.r * detail0 +
			splatting.g * detail1 +
			splatting.b * detail2 +
			(1.0 - splatting.r - splatting.g - splatting.b) * detail3 +
			(1.0 - splatting.a) * detail4);

	gl_FragData[0] = vec4(splatted.xyz, 1.);

	gl_FragData[1] = vec4(normalize(nor) * 0.5 + 0.5, gl_FragCoord.z);
	gl_FragData[2] = vec4(1. - splatted.a);
}
