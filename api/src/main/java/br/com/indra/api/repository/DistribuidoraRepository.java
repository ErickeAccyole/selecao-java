package br.com.indra.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.indra.api.entity.Distribuidora;

public interface DistribuidoraRepository extends CrudRepository<Distribuidora, Long> {
	
	Distribuidora findByCnpj(String cnpj);
}
