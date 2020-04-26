package br.com.indra.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.indra.api.entity.Estado;

public interface EstadoRepository extends CrudRepository<Estado, Long> {
	
	Estado findBySigla(String sigla);
}
