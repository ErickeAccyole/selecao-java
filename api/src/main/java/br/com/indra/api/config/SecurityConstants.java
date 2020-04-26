package br.com.indra.api.config;

public class SecurityConstants {
	public static final String SECRET = "desafio";
	public static final String TOKEN_PREFIX = "Indra ";
	public static final String HEADER_STRING = "Authorization";
	public static final String SIGN_UP_URL = "users/sign-up";
	public static final long EXPIRATION_TIME = 86400000L; // One day
}
