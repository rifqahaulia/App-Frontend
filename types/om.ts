
export type ObjectType = 'O' | 'P' | 'S' | 'C' | 'K'

export interface OmObject {
  id: number
  start_date: string
  end_date: string
  object_type: ObjectType
  object_id: string
  long_text: string
  short_text: string
  abbreviation: string
  update_user?: string | null
  update_time: string
  create_user?: string | null
  create_time: string
}

export interface OmRelation {
  id: number
  start_date: string
  end_date: string
  object_type: ObjectType
  object_id: string
  relation_type: string
  relation_object_type: ObjectType
  relation_object_id: string
  create_user: string
  create_time: string
  update_user?: string | null
  update_time: string
}

export interface TreeItem extends OmObject {
  children: TreeItem[]
  depth: number
  chief: boolean
}

export interface CreateOmObjectRequest {
  object_type: ObjectType
  object_id: string
  long_text: string
  short_text?: string
  abbreviation?: string
  start_date: string
  end_date?: string
}

export interface UpdateOmObjectRequest {
  object_type?: ObjectType
  object_id?: string
  long_text?: string
  short_text?: string
  abbreviation?: string
  start_date?: string
  end_date?: string
}

export interface CreateOmRelationRequest {
  object_type: ObjectType
  object_id: string
  relation_object_type: ObjectType
  relation_object_id: string
  start_date: string
  end_date?: string
  chief?: boolean
}

export interface GetOrgStructureParams {
  object_type?: ObjectType
  object_id?: string
  date?: string
}

export interface SearchOmObjectParams {
  start_range?: string
  end_range?: string
  object_id?: string
  object_type?: ObjectType
  long_text?: string
  short_text?: string
  abbreviation?: string
}