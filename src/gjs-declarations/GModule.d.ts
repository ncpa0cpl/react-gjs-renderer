import GLib from "gi://GLib";

/**
 * Generated with https://github.com/Gr3q/GIR2TS - If possible do
 * not modify.
 */
declare module "gi://GModule" {
  export interface ModuleInitOptions {}
  /**
   * The #GModule struct is an opaque data structure to represent
   * a [dynamically-loaded
   * module][glib-Dynamic-Loading-of-Modules]. It should only be
   * accessed via the following functions.
   */
  interface Module {}
  class Module {
    public constructor(options?: Partial<ModuleInitOptions>);
    /**
     * Closes a module.
     *
     * @returns %TRUE on success
     */
    public close(): boolean;
    /**
     * Ensures that a module will never be unloaded. Any future
     * {@link GModule.close} calls on the module will be ignored.
     */
    public make_resident(): void;
    /**
     * Returns the filename that the module was opened with.
     *
     * If #module refers to the application itself, "main" is
     * returned.
     *
     * @returns The filename of the module
     */
    public name(): string;
    /**
     * Gets a symbol pointer from a module, such as one exported
     * by #G_MODULE_EXPORT. Note that a valid symbol can be
     * %NULL.
     *
     * @param symbol_name The name of the symbol to find
     * @returns %TRUE on success
     *
     *   Returns the pointer to the symbol value
     */
    public symbol(symbol_name: string): [boolean, any | null];
  }

  /** Errors returned by {@link GModule.open_full}. */
  enum ModuleError {
    /** There was an error loading or opening a module file */
    FAILED = 0,
    /**
     * A module returned an error from its
     * {@link `g.module_check_init}` function
     */
    CHECK_FAILED = 1,
  }

  /**
   * Flags passed to {@link GModule.open}. Note that these flags
   * are not supported on all platforms.
   */
  enum ModuleFlags {
    /**
     * Specifies that symbols are only resolved when needed. The
     * default action is to bind all symbols when the module is
     * loaded.
     */
    LAZY = 1,
    /**
     * Specifies that symbols in the module should not be added
     * to the global name space. The default action on most
     * platforms is to place symbols in the module in the global
     * name space, which may cause conflicts with existing
     * symbols.
     */
    LOCAL = 2,
    /** Mask for all flags. */
    MASK = 3,
  }

  /**
   * Specifies the type of the module initialization function. If
   * a module contains a function named {@link GModule.check_init}
   * it is called automatically when the module is loaded. It is
   * passed the #GModule structure and should return %NULL on
   * success or a string describing the initialization error.
   */
  interface ModuleCheckInit {
    /**
     * Specifies the type of the module initialization function.
     * If a module contains a function named
     * {@link GModule.check_init} it is called automatically when
     * the module is loaded. It is passed the #GModule structure
     * and should return %NULL on success or a string describing
     * the initialization error.
     *
     * @param module The #GModule corresponding to the module
     *   which has just been loaded
     * @returns %NULL on success, or a string describing the
     *   initialization error
     */
    (module: Module): string;
  }

  /**
   * Specifies the type of the module function called when it is
   * unloaded. If a module contains a function named
   * {@link GModule.unload} it is called automatically when the
   * module is unloaded. It is passed the #GModule structure.
   */
  interface ModuleUnload {
    /**
     * Specifies the type of the module function called when it
     * is unloaded. If a module contains a function named
     * {@link GModule.unload} it is called automatically when the
     * module is unloaded. It is passed the #GModule structure.
     *
     * @param module The #GModule about to be unloaded
     */
    (module: Module): void;
  }

  /**
   * A portable way to build the filename of a module. The
   * platform-specific prefix and suffix are added to the
   * filename, if needed, and the result is added to the
   * directory, using the correct separator character.
   *
   * The directory should specify the directory where the module
   * can be found. It can be %NULL or an empty string to indicate
   * that the module is in a standard platform-specific
   * directory, though this is not recommended since the wrong
   * module may be found.
   *
   * For example, calling {@link GModule.build_path} on a Linux
   * system with a #directory of `/lib` and a #module_name of
   * "mylibrary" will return `/lib/libmylibrary.so`. On a Windows
   * system, using `\Windows` as the directory it will return
   * `\Windows\mylibrary.dll`.
   *
   * @param directory The directory where the module is. This can
   *   be %NULL or the empty string to indicate that the standard
   *   platform-specific directories will be used, though that is
   *   not recommended
   * @param module_name The name of the module
   * @returns The complete path of the module, including the
   *   standard library prefix and suffix. This should be freed
   *   when no longer needed
   */
  function module_build_path(
    directory: string | null,
    module_name: string
  ): string;

  /**
   * Gets a string describing the last module error.
   *
   * @returns A string describing the last module error
   */
  function module_error(): string;

  function module_error_quark(): GLib.Quark;

  /**
   * Checks if modules are supported on the current platform.
   *
   * @returns %TRUE if modules are supported
   */
  function module_supported(): boolean;
}
