import { Router } from 'express';
import { controller } from '../factories/UserFactory';

const router = Router();
router.post('/cpf', controller.addCpf);
router.get('/cpf/:cpf', controller.findByCpf);
router.get('/cpf', controller.allCpf);
router.delete('/cpf/:cpf', controller.removeCpf);

export default router;