import { NativeModules } from 'react-native'

const { ReactNativeBiometrics: bridge } = NativeModules

/**
 * Type alias for possible biometry types
 */
export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics'

interface RNBiometricsOptions {
  allowDeviceCredentials?: boolean
}

interface IsSensorAvailableResult {
  available: boolean
  biometryType?: BiometryType
  error?: string
}

interface CreateKeysOptions {
  alias?: string
}

interface CreateKeysResult {
  publicKey: string
}

interface BiometricKeysExistOptions {
  alias?: string
}

interface BiometricKeysExistResult {
  keysExist: boolean
}

interface DeleteKeysOptions {
  alias?: string
}

interface DeleteKeysResult {
  keysDeleted: boolean
}

interface CreateSignatureOptions {
  promptMessage: string
  payload: string
  cancelButtonText?: string
  alias?: string
}

interface CreateSignatureResult {
  success: boolean
  signature?: string
  error?: string
}

interface SimplePromptOptions {
  promptMessage: string
  fallbackPromptMessage?: string
  cancelButtonText?: string
}

interface SimplePromptResult {
  success: boolean
  error?: string
}

/**
 * Enum for touch id sensor type
 */
export const TouchID = 'TouchID'
/**
 * Enum for face id sensor type
 */
export const FaceID = 'FaceID'
/**
 * Enum for generic biometrics (this is the only value available on android)
 */
export const Biometrics = 'Biometrics'

export const BiometryTypes = {
  TouchID,
  FaceID,
  Biometrics
}

export module ReactNativeBiometricsLegacy {
  /**
   * Returns promise that resolves to an object with object.biometryType = Biometrics | TouchID | FaceID
   * @returns {Promise<Object>} Promise that resolves to an object with details about biometrics available
   */
  export function isSensorAvailable(): Promise<IsSensorAvailableResult> {
    return new ReactNativeBiometrics().isSensorAvailable()
  }

  /**
   * Creates a public private key pair,returns promise that resolves to
   * an object with object.publicKey, which is the public key of the newly generated key pair
   * @param {Object} createKeysOptions
   * @param {string} createKeysOptions.alias
   * @returns {Promise<Object>}  Promise that resolves to object with details about the newly generated public key
   */
  export function createKeys(createKeysOptions: CreateKeysOptions): Promise<CreateKeysResult> {
    return new ReactNativeBiometrics().createKeys(createKeysOptions)
  }

  /**
   * Returns promise that resolves to an object with object.keysExists = true | false
   * indicating if the keys were found to exist or not
   * @param {Object} biometricKeysExistOptions
   * @param {string} biometricKeysExistOptions.alias
   * @returns {Promise<Object>} Promise that resolves to object with details about the existence of keys
   */
  export function biometricKeysExist(biometricKeysExistOptions: BiometricKeysExistOptions): Promise<BiometricKeysExistResult> {
    return new ReactNativeBiometrics().biometricKeysExist(biometricKeysExistOptions)
  }

  /**
   * Returns promise that resolves to an object with true | false
   * indicating if the keys were properly deleted
   * @param {Object} deleteKeysOptions
   * @param {string} deleteKeysOptions.alias
   * @returns {Promise<Object>} Promise that resolves to an object with details about the deletion
   */
  export function deleteKeys(deleteKeysOptions: DeleteKeysOptions): Promise<DeleteKeysResult> {
    return new ReactNativeBiometrics().deleteKeys(deleteKeysOptions)
  }

  /**
   * Prompts user with biometrics dialog using the passed in prompt message and
   * returns promise that resolves to an object with object.signature,
   * which is cryptographic signature of the payload
   * @param {Object} createSignatureOptions
   * @param {string} createSignatureOptions.promptMessage
   * @param {string} createSignatureOptions.payload
   * @param {string} createSignatureOptions.alias
   * @returns {Promise<Object>}  Promise that resolves to an object cryptographic signature details
   */
  export function createSignature(createSignatureOptions: CreateSignatureOptions): Promise<CreateSignatureResult> {
    return new ReactNativeBiometrics().createSignature(createSignatureOptions)
  }

  /**
   * Prompts user with biometrics dialog using the passed in prompt message and
   * returns promise that resolves to an object with object.success = true if the user passes,
   * object.success = false if the user cancels, and rejects if anything fails
   * @param {Object} simplePromptOptions
   * @param {string} simplePromptOptions.promptMessage
   * @param {string} simplePromptOptions.fallbackPromptMessage
   * @returns {Promise<Object>}  Promise that resolves an object with details about the biometrics result
   */
  export function simplePrompt(simplePromptOptions: SimplePromptOptions): Promise<SimplePromptResult> {
    return new ReactNativeBiometrics().simplePrompt(simplePromptOptions)
  }
}

export default class ReactNativeBiometrics {
    allowDeviceCredentials = false

    /**
     * @param {Object} rnBiometricsOptions
     * @param {boolean} rnBiometricsOptions.allowDeviceCredentials
     */
    constructor(rnBiometricsOptions?: RNBiometricsOptions) {
      const allowDeviceCredentials = rnBiometricsOptions?.allowDeviceCredentials ?? false
      this.allowDeviceCredentials = allowDeviceCredentials
    }

    /**
     * Returns promise that resolves to an object with object.biometryType = Biometrics | TouchID | FaceID
     * @returns {Promise<Object>} Promise that resolves to an object with details about biometrics available
     */
    isSensorAvailable(): Promise<IsSensorAvailableResult> {
      return bridge.isSensorAvailable({
        allowDeviceCredentials: this.allowDeviceCredentials
      })
    }

    /**
     * Creates a public private key pair,returns promise that resolves to
     * an object with object.publicKey, which is the public key of the newly generated key pair
     * @param {Object} createKeysOptions
     * @param {string} createKeysOptions.alias
     * @returns {Promise<Object>}  Promise that resolves to object with details about the newly generated public key
     */
    createKeys(createKeysOptions: CreateKeysOptions): Promise<CreateKeysResult> {
      return bridge.createKeys({
        allowDeviceCredentials: this.allowDeviceCredentials,
        ...createKeysOptions
      })
    }

    /**
     * Returns promise that resolves to an object with object.keysExists = true | false
     * indicating if the keys were found to exist or not
     * @param {Object} biometricKeysExistOptions
     * @param {string} biometricKeysExistOptions.alias
     * @returns {Promise<Object>} Promise that resolves to object with details aobut the existence of keys
     */
    biometricKeysExist(biometricKeysExistOptions: BiometricKeysExistOptions): Promise<BiometricKeysExistResult> {
      return bridge.biometricKeysExist(biometricKeysExistOptions)
    }

    /**
     * Returns promise that resolves to an object with true | false
     * indicating if the keys were properly deleted
     * @param {Object} deleteKeysOptions
     * @param {string} deleteKeysOptions.alias
     * @returns {Promise<Object>} Promise that resolves to an object with details about the deletion
     */
    deleteKeys(deleteKeysOptions: DeleteKeysOptions): Promise<DeleteKeysResult> {
      return bridge.deleteKeys(deleteKeysOptions)
    }

    /**
     * Prompts user with biometrics dialog using the passed in prompt message and
     * returns promise that resolves to an object with object.signature,
     * which is cryptographic signature of the payload
     * @param {Object} createSignatureOptions
     * @param {string} createSignatureOptions.promptMessage
     * @param {string} createSignatureOptions.payload
     * @returns {Promise<Object>}  Promise that resolves to an object cryptographic signature details
     */
    createSignature(createSignatureOptions: CreateSignatureOptions): Promise<CreateSignatureResult> {
      createSignatureOptions.cancelButtonText = createSignatureOptions.cancelButtonText ?? 'Cancel'

      return bridge.createSignature({
        allowDeviceCredentials: this.allowDeviceCredentials,
        ...createSignatureOptions
      })
    }

    /**
     * Prompts user with biometrics dialog using the passed in prompt message and
     * returns promise that resolves to an object with object.success = true if the user passes,
     * object.success = false if the user cancels, and rejects if anything fails
     * @param {Object} simplePromptOptions
     * @param {string} simplePromptOptions.promptMessage
     * @param {string} simplePromptOptions.fallbackPromptMessage
     * @returns {Promise<Object>}  Promise that resolves an object with details about the biometrics result
     */
    simplePrompt(simplePromptOptions: SimplePromptOptions): Promise<SimplePromptResult> {
      simplePromptOptions.cancelButtonText = simplePromptOptions.cancelButtonText ?? 'Cancel'
      simplePromptOptions.fallbackPromptMessage = simplePromptOptions.fallbackPromptMessage ?? 'Use Passcode'

      return bridge.simplePrompt({
        allowDeviceCredentials: this.allowDeviceCredentials,
        ...simplePromptOptions
      })
    }
  }
