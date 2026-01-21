/// <reference path="../types/express.d.ts" />
import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

// קריאת כל המשימות של המשתמש המחובר
export const getTasks = async (req: Request, res: Response) => {
    const user = req.user;
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', req.user!.id);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

// New task
export const createTask = async (req: Request, res: Response) => {
    const user = req.user;
    const { title, description } = req.body;

    const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description, user_id: req.user!.id }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data);
};

// Update existing task
export const updateTask = async (req: Request, res: Response) => {
    const taskIdParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const taskId = parseInt(taskIdParam);
    const { title, description } = req.body;

    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    // First, verify the task exists and belongs to the user
    const { data: existingTask, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .eq('user_id', req.user!.id)
        .single();

    if (fetchError || !existingTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task
    const { data, error } = await supabase
        .from('tasks')
        .update({ title, description })
        .eq('id', taskId)
        .eq('user_id', req.user!.id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

// Delete existing task
export const deleteTask = async (req: Request, res: Response) => {
    const taskIdParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const taskId = parseInt(taskIdParam);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Ensure the task exists and belongs to the current user
    const { data: existingTask, error: fetchError } = await supabase
        .from('tasks')
        .select('id')
        .eq('id', taskId)
        .eq('user_id', req.user!.id)
        .single();

    if (fetchError || !existingTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', req.user!.id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).send();
};
