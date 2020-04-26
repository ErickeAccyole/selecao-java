package br.com.indra.api.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.indra.api.entity.Combustivel;
import br.com.indra.api.model.CombustivelModel;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RequestMapping
@RestController
public class CombustivelRoute {
	@Autowired
	private CombustivelModel combustivelModel;

	public CombustivelRoute(CombustivelModel combustivelModel) {
		this.combustivelModel = combustivelModel;
	}

	@ApiOperation(value = "Salva um combustivel na base de dados")
	@PostMapping(path = "combustiveis")
	public ResponseEntity<?> save(@RequestBody Combustivel combustivel) throws Exception {
		try {
			return new ResponseEntity<>(combustivelModel.salvar(combustivel), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Atualiza um combustivel na base de dados")
	@PutMapping(path = "combustiveis")
	public ResponseEntity<?> update(@RequestBody Combustivel combustivel) throws Exception {
		try {
			return new ResponseEntity<>(combustivelModel.update(combustivel), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Remove um combustivel da base de dados")
	@DeleteMapping(path = "combustiveis/{id}")
	public ResponseEntity<?> remove(@PathVariable long id) throws Exception {
		try {
			combustivelModel.remove(id);

			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Recupera os combustiveis na base de dados")
	@GetMapping(path = "combustiveis")
	public ResponseEntity<?> getAll() throws Exception {
		try {
			return new ResponseEntity<>(combustivelModel.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Recupera o combustivel pelo id na base de dados")
	@GetMapping(path = "combustiveis/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) throws Exception {
		try {
			return new ResponseEntity<>(combustivelModel.getById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
