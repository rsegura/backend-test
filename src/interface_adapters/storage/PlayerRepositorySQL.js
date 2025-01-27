'use strict';

const Player = require(process.cwd()+'/src/app/domain/entities/Player');
const sequelize = require(process.cwd()+'/src/infra/database/sequelize');
module.exports = class {
	constructor() {
		this.db = sequelize;
		this.model = this.db.model('player')
	}

	async getByNickName(nickName) {
 		const seqPlayer = await this.model.findOne({ where: { nickName: nickName } });		
 		if(seqPlayer === undefined || seqPlayer === null){
 			return null;
 		}
 		return new Player(seqPlayer.id, seqPlayer.nickName, seqPlayer.number, seqPlayer.position);
	}

	async create(playerEntity){
		const {nickName, number, position, teamId} = playerEntity;
		const seqPlayer = await this.model.create({nickName, number, position, teamId});
		await seqPlayer.save();
 		return new Player(seqPlayer.id, seqPlayer.nickName, seqPlayer.number, seqPlayer.position, seqPlayer.teamId);
	}

	async update(newData, name){
		console.log(newData);
		const seqPlayer = await this.model.update(newData, {where:{nickName:name}});
 		return null;
	}

	async delete(name){
		const seqPlayer = await this.model.destroy({where:{nickName:name}});
		return null;
	}

	async find(limit, offset, filter){
		const seqPlayer = await this.model.findAll({limit, offset, where:filter});
    	return seqPlayer.map((seqPlayer) => {
      		return new Player(seqPlayer.id, seqPlayer.nickName, seqPlayer.number, seqPlayer.position, seqPlayer.teamId);
    	});
	}
};