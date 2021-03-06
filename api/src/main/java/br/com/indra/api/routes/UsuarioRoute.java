package br.com.indra.api.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.indra.api.entity.Usuario;
import br.com.indra.api.model.UsuarioModel;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api
@RequestMapping
@RestController
public class UsuarioRoute {
	@Autowired
	private UsuarioModel usuarioModel;

	public UsuarioRoute(UsuarioModel usuarioModel) {
		this.usuarioModel = usuarioModel;
	}

	@ApiOperation(value = "Salva um usuario na base de dados")
	@PostMapping(path = "usuarios")
	public ResponseEntity<?> save(@RequestBody Usuario usuario) throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.salvar(usuario), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Atualiza um usuario na base de dados")
	@PutMapping(path = "usuarios")
	public ResponseEntity<?> update(@RequestBody Usuario usuario) throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.update(usuario), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Remove um usuario da base de dados")
	@DeleteMapping(path = "usuarios/{id}")
	public ResponseEntity<?> remove(@PathVariable long id) throws Exception {
		try {
			usuarioModel.remove(id);

			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "Recupera os usuarios na base de dados")
	@GetMapping(path = "usuarios")
	public ResponseEntity<?> getAll() throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Recupera a usuario pelo id na base de dados")
	@GetMapping(path = "usuarios/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.getById(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Atualiza a conta do usuario")
	@PatchMapping(path = "usuarios/atualiza-conta")
	public ResponseEntity<?> updateConta(@RequestBody Usuario usuario) throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.updateConta(usuario), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@ApiOperation(value = "Atualiza a a senha da conta do usuario")
	@PatchMapping(path = "usuarios/atualiza-senha")
	public ResponseEntity<?> updateSenha(@RequestBody Usuario usuario) throws Exception {
		try {
			return new ResponseEntity<>(usuarioModel.updateSenha(usuario), HttpStatus.OK);			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
