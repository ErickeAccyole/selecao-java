package br.com.indra.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.indra.api.entity.Municipio;

public interface MunicipioRepository extends CrudRepository<Municipio, Long> {
	
	Municipio findByNome(String nome);
}
