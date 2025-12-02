// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers) // добавляем удобные matchers
afterEach(() => cleanup()) // очищаем DOM после каждого теста
