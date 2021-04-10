export interface TodoInterface {
    id: number,
    title: string,
    content: string,
    lastModifiedDate: string,
    urgency: 'very urgent' | 'urgently' | 'medium urgency' | 'do not rush',
    isDone: boolean
}
