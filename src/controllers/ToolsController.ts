import { Request, Response } from 'express';
import db from "../database/connection";

interface Tool {
  title: string,
  link: string,
  description: string,
  tags: string,
};

export default class ToolsController {
  async index(request: Request, response: Response) {
    const tools = await db('tools');

    const filters = request.query;
    const tag = filters.tag as string;
    const dynamic = filters.dynamic as string;

    if (dynamic) {
      const filtered = await db('tools')
        .orWhere('title', 'like', `%${dynamic}%`)
        .orWhere('link', 'like', `%${dynamic}%`)
        .orWhere('tags', 'like', `%${dynamic}%`)
        .orWhere('description', 'like', `%${dynamic}%`)
        
      return response.json(filtered);
    }

    if (tag) {
      const filtered = await db('tools')
        .where('tags', 'like', `%${tag}%`)
        
      return response.json(filtered);
    }

    return response.json(tools);
  }

  async create(request: Request, response: Response) {
    const {
      title,
      link,
      description,
      tags
    } = request.body;

    const trx = await db.transaction();

    const insertedTool = await trx('tools').insert({
      title, link, description, tags,
    });

    await trx.commit();

    const createdTool = await db('tools')
      .where('id', `${insertedTool}`)

    return response.status(201).json(createdTool);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try{
      await db('tools')
        .where('tools.id', id)
        .del()
      
      return response.status(204).json();
    } catch (err) {
      return response.status(400).json('erro');
    }
  }
}
 