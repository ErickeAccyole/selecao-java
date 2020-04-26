package br.com.indra.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.indra.api.entity.Combustivel;

public interface CombustivelRepository extends CrudRepository<Combustivel, Long> {
	
	Combustivel findByNome(String nome);
}
