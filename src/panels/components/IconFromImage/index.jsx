import { Avatar } from '@vkontakte/vkui'
import React from 'react'

/**
 * Компонент, который превращает картинку в иконку, например, для меню
 * 
 * @param {string} image — Путь к изображению
 * @param {int} size — Размер иконки
 * @returns {JSX}
 */
export default function IconFromImage({ image, size }) {
    return (
        <Avatar size={size} shadow={false}>
            <img src={image} width={size} height={size} />
        </Avatar>
    )
}
