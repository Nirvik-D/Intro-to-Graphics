#version 330 compatibility
uniform bool fragment;
uniform float uKa, uKd, uKs; // coefficients of each type of lighting
uniform vec3 uColor; // object color
uniform vec3 uSpecularColor; // light color
uniform float uShininess;
uniform float uS0 , uT0,uSize ;
//uniform sampler uTexUnit;
in vec2 vST; // texture cords
in vec3 vN; // normal vector
in vec3 vL; // vector from point to light
in vec3 vE; // vector from point to eye
// specular exponent
void
main( )
{
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 myColor = uColor;

	if(fragment==true)
	{
		if(pow(vST.s-0.5,4.0)+pow((vST.t-pow((vST.s-0.5),4.0/3)),2.0)<=uSize/0.15)
		{
			myColor = vec3( 0., 1., 0. );
		}
		else
		{
			myColor = uColor;
		}
	}
	else
	{
		myColor = uColor;
	}


	vec3 ambient = uKa * myColor;
	float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * uColor;
	float s = 0.;
	if( dot(Normal,Light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}